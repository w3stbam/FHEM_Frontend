This is FHEM_Webfrontend v0.2

Prerequisites:

You will need the following setup to run the frontend:

  1) Installed FHEM, with activated dblog


How to Install:
1.) Copy the folder "app" to the www/pgm2/ directory of FHEM, e.g. /opt/fhem/www/pgm2/
    
2.) Download the ExtJS Library from http://www.sencha.com/products/extjs/download/ext-js-4.1.1/1683 .
    Create a folder called "lib" and extract the downloaded file into this folder, so that it reads
    lib/ext-4.1.1a .

3.) Copy the whole "lib" Folder to the www/pgm2/ directory of FHEM, e.g. /opt/fhem/www/pgm2/.

4.) Copy the whole "gray" folder (from www/pgm2/lib/ext-4.1.1a/resources/themes/images/) to www/images/default/ .
    so that it reads myfhemdirectory/www/images/default/dark/...

5.) Create a new folder in the docs Folder of FHEM, e.g. /opt/fhem/docs/frontend .

6.) Copy the file "index.html" to the newly created folder .

7.) Copy the file "99_DbUtils.pm" from folder "perlmodules" to the fhem/FHEM/ directory of FHEM, e.g. /opt/fhem/FHEM/ .

8.) You may have to give the correct path / name of your database.config (the same that DbLog uses) 
    in 99_DbUtils.pm in line 15 (my $dbconf = "db.conf";) . Currently it looks for a file called db.conf 
    in FHEMs main directory.

9.) Shutdown / Restart FHEM .

10.) Open up a webbrowser and point it to the location you have created (from step 5)
    (e.g. http://192.168.0.1:8083/fhem/docs/frontend/index.html) .
