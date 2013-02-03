################################################################
# This script does several SELECT queries on DbLogs Database to provide
# data in JSON-Format to the requesting User / Program
# 
# The main function queryDbLog is called with parameters 'userquery', 'device', 'xaxis', 'yaxis', 'time'
# Example calls from WebBrowser: 
#    http://192.168.0.1:8083/fhem?cmd={queryDbLog("getreadings", "ESA2000_LED_011e")}&XHR=1
#    http://192.168.0.1:8083/fhem?cmd={queryDbLog("daily","ESA2000_LED_011e","TIMESTAMP","actual_kwh","2013-02-01")}&XHR=1
################################################################

use DBI;
use strict;
use warnings;

my $dbconf = "db.conf";

sub DbUtils_Initialize($)
{
    my ($hash) = @_;  
}

################################################################
#
# Error handling, returns a JSON String
#
################################################################
sub jsonError($) {
  my $errormsg = $_[0]; 
  my $json = "{success: false, msg:'$errormsg'}\n";
  return $json;
}


################################################################
#
# Prepare the SQL String
#
################################################################
sub prepareSql(@_) {

    my $userquery = $_[0];
    my $device = $_[1];
    my $xaxis =$_[2];
    my $yaxis = $_[3];
    my $starttime = $_[4];
    my $endtime = $_[5];
    my $sql;
 
    if($userquery eq "getreadings") {
        $sql = "SELECT distinct(reading) FROM current WHERE device = '".$device."'";
    } elsif($userquery eq "getdevices") {
        $sql = 'SELECT distinct(device) FROM history';
    } elsif($userquery eq "describetable") {
        $sql = 'PRAGMA table_info([history]);';
    } elsif($userquery eq "daily") {
        $sql = 'SELECT '.$xaxis.', VALUE FROM history WHERE READING = "'.$yaxis.'" AND TIMESTAMP Between "'.$starttime.'" AND "'.$endtime.'";';
    } else {
        die jsonError("Could not setup SQL String");
    }

    return $sql;
}

################################################################
#
# Setup DB Connection
# Code adapted from DbLog.pm, thanks to Dr. Boris Neubert 
# and Tobias Faust
#
################################################################
sub 
connectDbLog($)
{

  my $configfilename= $_[0]; 
  if(!open(CONFIG, $configfilename)) {
        die jsonError("Cannot open database configuration file $configfilename.");
  }
  my @config=<CONFIG>;
  close(CONFIG);

  my %dbconfig;
  eval join("", @config);

  my $dbconn= $dbconfig{connection};
  my $dbuser= $dbconfig{user};
  my $dbpassword= $dbconfig{password};

  #check the database model
  if($dbconn =~ m/pg:/i || $dbconn =~ m/mysql:/i || $dbconn =~ m/oracle:/i || $dbconn =~ m/sqlite:/i) {
      
      my $dbh = DBI->connect_cached("dbi:$dbconn", $dbuser, $dbpassword);
      if(!$dbh) {
          die jsonError("Can't connect to $dbconn: $DBI::errstr");
      }

      return $dbh;
  
  } else {
      die jsonError("Unknown dbmodel type in configuration file $configfilename. Only Mysql, Postgresql, Oracle, SQLite are fully supported.");
  }
}

################################################################
#
# Do the query
#
################################################################
sub queryDbLog(@_) {

    my $sql = prepareSql(@_);

    my $dbh = connectDbLog($dbconf); 
    
    my $query_handle = $dbh->prepare($sql) 
        or die jsonError("Couldn't prepare statement: " . $dbh->errstr);
    
    # EXECUTE THE QUERY
    $query_handle->execute() 
        or die jsonError("Couldn't execute statement: " . $query_handle->errstr);
    
    my $columns = $query_handle->{'NAME'};
    my $columncnt = scalar @$columns;
    
    my $i = 0;
    my $jsonstring = "[";
    while ( my @data = $query_handle->fetchrow_array()) {
        
        if($i == 0) {
            $jsonstring .= "{";
        } else {
            $jsonstring .= ",{";
        } 
     
        for ($i = 0; $i < $columncnt; $i++) {
            $jsonstring .= "'";
            $jsonstring .= uc($query_handle->{NAME}->[$i]); 
            $jsonstring .= "':'";
            $jsonstring .= $data[$i];
            
            if($i == ($columncnt -1)) {
               $jsonstring .= "'";
            } else {
               $jsonstring .= "',"; 
            } 
        }
        $jsonstring .= "}"; 
    }
    $jsonstring .= "]";
    return $jsonstring;
}

1;