<?php
umask(0);
//if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    ini_set( 'display_errors', 0);
    header('Content-type:application/json; charset=utf8;');
    header('Access-Control-Allow-Origin: *');
    $globalRanks = "../userdata/ranks.txt";
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $Rank = $_GET["rank"];
        $Name = $_GET["name"];
        $wantCode = $_GET["wantcode"];
        $privateRanks = "../userdata/$Name/ranks_$Name.txt";
        $logins = "../userdata/$Name";
        if(!file_exists($logins)){
          mkdir($logins, 0777, true);
        }
        if(isset($Name)){
          touch($privateRanks);
          chmod($privateRanks, 0777);
          if($fp = fopen($privateRanks, 'a+')){
            while (($row = fgetcsv($fp, 10000, ",")) !== FALSE) {
              $data[] = array( 'namel'=>$row[0] ,'scorel'=>$row[1], 's_date'=>$row[2]);
            }
            fclose($fp);
            foreach ($data as $key => $row) {
              $namel[$key] = $row['namel'];
              $scorel[$key] = $row['scorel'];
              $s_date[$key] = $row['s_date'];
            }
            array_multisort($scorel, SORT_DESC, $namel, SORT_DESC, $s_date, SORT_DESC, $data);
            if(strval($wantCode)){
              $codefileName = "../userdata/$Name/$Name"."_$scorel[$Rank]"."_$s_date[$Rank].txt";
              if(file_exists($codefileName)){
                echo json_encode(explode(":","200:$Rank:$Name:".file_get_contents($codefileName)));
              }
              else{
                echo json_encode(explode(":","404:Codefile not found."));
              }
            }
            else{
              echo json_encode(explode(":","200:$Rank:$Name:$scorel[$Rank]"));
            }
          }
          else{
            echo json_encode(explode(":","403:Permission Error."));
          }
        }
        else{
          touch($globalRanks);
          chmod($globalRanks, 0777);
          if($fp = fopen($globalRanks, 'a+')){
            while (($row = fgetcsv($fp, 10000, ",")) !== FALSE) {
              $data[] = array( 'namel'=>$row[0] ,'scorel'=>$row[1], 's_date'=>$row[2]);
            }
            fclose($fp);
            foreach ($data as $key => $row) {
              $namel[$key] = $row['namel'];
              $scorel[$key] = $row['scorel'];
              $s_date[$key] = $row['s_date'];
            }
            array_multisort($scorel, SORT_DESC, $namel, SORT_DESC, $s_date, SORT_DESC, $data);
            if(strval($wantCode)){
              $codefileName = "../userdata/$namel[$Rank]/$namel[$Rank]"."_$scorel[$Rank]"."_$s_date[$Rank].txt";
              if(file_exists($codefileName)){
                echo json_encode(explode(":","200:$Rank:$namel[$Rank]:".file_get_contents($codefileName)));
              }
              else{
                echo json_encode(explode(":","404:Codefile not found."));
              }
            }
            else{
              echo json_encode(explode(":","200:$Rank:$namel[$Rank]:$scorel[$Rank]"));
            }
          }
          else{
            echo json_encode(explode(":","403:Permission Error."));
          }
        }
    } else {
      $Date = date("YmdHis");
      $Name = $_POST["name"];
      $Score = $_POST["score"];
      $Code = $_POST["code"];
      $codefileName = "../userdata/$Name/$Name"."_$Score"."_$Date.txt";
      $privateRanks = "../userdata/$Name/ranks_$Name.txt";
      $logins = "../userdata/$Name";
      if(isset($Name) && isset($Score)){
        if(!file_exists($logins)){
          mkdir($logins, 0777, true);
        }
        if(file_put_contents($privateRanks, $Name.",".$Score.",".$Date."\n", LOCK_EX|FILE_APPEND) && file_put_contents($globalRanks, $Name.",".$Score.",".$Date."\n", LOCK_EX|FILE_APPEND)){
          if(isset($Code)){
            if(file_put_contents($codefileName, $Code)){
              echo json_encode(explode(":","200:OK."));
            }
            else{
              echo json_encode(explode(":","403:Permission Error."));
            }
          }
          else{
            echo json_encode(explode(":","200:OK.but no code."));
          }
        }
        else{
          echo json_encode(explode(":","403:Permission Error."));
          exit();
        }
      }
      else{
        echo json_encode(explode(":",'400:Some parameters are wrong.'));
      }
    }
?>
