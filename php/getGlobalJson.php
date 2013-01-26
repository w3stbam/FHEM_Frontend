<?php

$returned=URLopen("http://192.168.0.111:8083/fhem?cmd=jsonlist&XHR=1");

function URLopen($url)
{
        $dh = fopen("$url",'r');
        $contents = '';
        while (!feof($dh)) {
            $contents .= fread($dh, 64192);
        }
        echo $contents;
//        $result = fread($dh,8388608);                                                                                                                            
//        echo $result;
}

//$handle = fopen("http://192.168.0.111:8083/fhem?cmd=jsonlist&XHR=1", "rb"); 
// echo stream_get_contents($handle); 
//    fclose($handle); 

?>



