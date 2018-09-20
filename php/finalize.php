<?php

header('Content-type:application/json; charset=utf8;');
header('Access-Control-Allow-Origin: *');
//ini_set( 'display_errors', 0);
umask(0);
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $src = "../userdata";
    $date = date("YmdHis");
    $dest = $src.$date;
    if(file_exists($src)){
        mkdir($dest,0777);
        exec("cp -r ".$src."/* ".$dest, $error);
        if(count($error)==0){
            rmrf($src);
            mkdir($src,0777);
            echo json_encode(explode(":","200:OK."));
        }
        //var_dump($error);
    }
    else{
        if(!mkdir($src,0777,true)){
            echo json_encode(explode(":","403:Permission Error. Can't mkdir."));
        }
        else{
            echo json_encode(explode(":","200:mkdir OK."));
        }
    }
}

function rmrf($dir) {
    if (is_dir($dir) and !is_link($dir)) {
        array_map('rmrf',   glob($dir.'/*', GLOB_ONLYDIR));
        array_map('unlink', glob($dir.'/*'));
        rmdir($dir);
    }
}
