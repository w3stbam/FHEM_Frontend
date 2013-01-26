This is FHEM_Webfrontend v0.1

Prerequisites:

You will need the following setup to run the frontend:

  1) Installed FHEM, with activated dblog based on SQLITE3
  
  2) Webserver, e.g. Apache
  
  3) PHP5 installed in Webserver
  
  3.1) PHP Extensions: php5-sqlite
  
  For Linux / Debian users, the following packages should do the trick:
  
  apt-get install apache2 sqlite3 libapache2-mod-php5 php5-sqlite
  
How to Install:

1.) Copy the whole Application, containing "app", "php", "resources" Folder and "index.html" 
    to a directory served by your webserver.
    On Unix Systems this can be /var/www/YOURNEWFOLDER
    
2.) Download the ExtJS Library from http://www.sencha.com/products/extjs/download/ext-js-4.1.1/1683
    Create a folder called "lib" in the same Path where you dropped the files from the previous step
    Extract the downloaded File under the lib Folder, so that 
    it will look like  /var/www/YOURNEWFOLDER/lib/ext-4.1.1a

3.) Setup the Databaseconnection in php/queryDb.php (line 9) to match your installation

4.) Open up a webbrowser and and point it to the location you have created 
    (e.g. http://localhost/YOURNEWFOLDER/index.html)

