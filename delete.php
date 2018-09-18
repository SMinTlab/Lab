<?php
umask(0);
if(chmod(userdata, 0777, true)){
  echo "chmod OK.";
}
else{
  echo "chmod NG.";
}
$dir = "userdata";
rmrf($dir);

function rmrf($dir) {
  if (is_dir($dir) and !is_link($dir)) {
    echo "<pre>";
    var_dump(array_map('rmrf',   glob($dir.'/*', GLOB_ONLYDIR)));
    echo "</pre>";
    echo "<pre>";
    var_dump(array_map('unlink', glob($dir.'/*')));
    echo "</pre>";
    echo "<br>";
    if(rmdir($dir)){
      echo "rmdir OK.";
    }
    else{
      echo "rmdir NG.";
    }
  }
}
?>
