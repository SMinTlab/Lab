<?php
umask(0);
//if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    //ini_set( 'display_errors', 0);
    header('Content-type:application/json; charset=utf8;');
    header('Access-Control-Allow-Origin: *');
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $Num = isset($_GET["num"])?$_GET["num"]:null;
        $Winner = isset($_GET["winner"])?$_GET["winner"]:null;
        $chalog = "../userdata/chalog.txt";
        if(!file_exists($chalog)){
          echo json_encode(explode(":","404:$chalog not found."));
        }
        if(isset($Num)){
          if($fp = fopen($chalog, 'a+')){
            while (($row = fgetcsv($fp, 1024, ",")) !== FALSE) {
              $data[] = array( 'winl'=>$row[0] ,'loosel'=>$row[1], 'winscl'=>$row[2], 'loosescl'=>$row[3], 's_date'=>$row[4]);
            }
            fclose($fp);
            if(isset($Winner)){
              foreach ($data as $key => $row) {
                if($row['winl']==$Winner){
                  $winl[$key] = $row['winl'];
                  $loosel[$key] = $row['loosel'];
                  $winscl[$key] = $row['winscl'];
                  $loosescl[$key] = $row['loosescl'];
                  $s_date[$key] = $row['s_date'];
                }
              }
            }
            else{
              foreach ($data as $key => $row) {
                $winl[$key] = $row['winl'];
                $loosel[$key] = $row['loosel'];
                $winscl[$key] = $row['winscl'];
                $loosescl[$key] = $row['loosescl'];
                $s_date[$key] = $row['s_date'];
              }
            }
            array_multisort($s_date, SORT_DESC, $winl, SORT_DESC, $loosel, SORT_DESC, $winscl, SORT_DESC, $loosescl, SORT_DESC, $data);
            echo json_encode(explode(":","200:$winl[$Num]:$loosel[$Num]:$winscl[$Num]:$loosescl[$Num]:$s_date[$Num]"));
          }
          else{
            echo json_encode(explode(":","403:Permission Error."));
          }
        }
        else{
          echo json_encode(explode(":","400:Request Error."));
        }
    } else {
      $Date = date("YmdHis");
      $Winner = $_POST["winner"];
      $Looser = $_POST["looser"];
      $Winsc = $_POST["winsc"];
      $Loosesc = $_POST["loosesc"];
      $chalog = "../userdata/chalog.txt";

      if(isset($Winner) && isset($Looser) && isset($Winsc) && isset($Loosesc)){
        if(!file_exists($chalog)){
          touch($chalog);
        }
        chmod($chalog, 0777);
        if(file_put_contents($chalog, $Winner.",".$Looser.",".$Winsc.",".$Loosesc.",".$Date."\n", LOCK_EX|FILE_APPEND)){
          echo json_encode(explode(":","200:OK."));
        }
        else{
          echo json_encode(explode(":","403:Permission Error."));
          exit();
        }
      }
      else{
        echo json_encode(explode(":",'400:Request Error.'));
      }
    }
?>
