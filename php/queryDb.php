<?php
// This file connects to the database and does some SELECT queries neede for charting
// It is assumed that the histoy / current TABLE has been set up like this:
//
// CREATE TABLE history (TIMESTAMP TIMESTAMP, DEVICE varchar(32), TYPE varchar(32), EVENT varchar(64), READING varchar(32), VALUE varchar(32), UNIT varchar(32)); 
//
// Please configure the DB first in the following line (SQLITE does not need a user / password)

$db = new SQLite3('/opt/fhem/fhem.db');

// get the method from userinput
$userquery = $_REQUEST['query'];
$device = $_REQUEST['device'];
$xaxis = $_REQUEST['xaxis'];
$yaxis = $_REQUEST['yaxis'];
$time = $_REQUEST['time'];

switch ($userquery) {
    case "getreadings":
        $sql = "SELECT distinct(reading) FROM current WHERE device = '".$device."'";
        $results = $db->query($sql);
        $rows = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            if (!empty($row)) {
                $rows[] = $row;
            }
        }
        break;

    case "getdevices":
        $results = $db->query('SELECT distinct(device) FROM history');
        $rows = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $rows[] = $row;
        }
        break;
        
    case "describetable":
        $results = $db->query('PRAGMA table_info([history]);');
        $rows = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $rows[] = $row;
        }
        break;
        
    case "daily":
        $sql = 'SELECT '.$xaxis.', VALUE FROM history WHERE READING = "'.$yaxis.'" AND TIMESTAMP Between "'.$time.'" AND date("'.$time.'","+1 day");';
        $results = $db->query($sql);
        $rows = array();
        while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
            $rows[] = $row;
        }
        break;
    
}

print json_encode($rows);

?>

