<?php

header('Content-type:application/json; charset=utf8;');
header('Access-Control-Allow-Origin: *');
ini_set( 'display_errors', 0);
umask(0);
if ($_SERVER['REQUEST_METHOD'] == "POST") {
  $fileNum = $_POST['option'];
  $Name = $_POST['name'];
  $fileName = "../userdata/$Name/log$Name"."_$fileNum"."_".date("YmdHis").".txt";
  $data = $_POST['request'];
  $logins = "../userdata/$Name";
  if (isset($Name)) {
    if (isset($data)) {
      if(!file_exists($logins)){
        mkdir($logins,0777,true);
      }
      if (file_put_contents($fileName, $data . "\n")) {
          echo json_encode(explode(":","200:OK."));
      } else {
          echo json_encode(explode(":","403:Permission Error."));
      }
    } else {
      if (mkdir($logins,0777,true)) {
        echo json_encode(explode(":","200:OK."));
      }
      else{
        echo json_encode(explode(":","403:Permission Error."));
      }
    }
  }
  else{
    echo json_encode(explode(":","400:Request Error."));
  }
}
else{

}

?>
