<?php
    //관리자 어플리케이션 201837204 비번변경
    //header("Content-Type: text/html;charset=UTF-8");
    $conn = mysqli_connect("localhost","root","","dbcapstonedesignserver");
    $lckPassword="'".$_POST['lckPassword']."'";
    $query ="update tLocker set lckPassword=".$lckPassword." where lckId='0202323'";
    $result = mysqli_query($conn, $query);

    if($result)
      echo "1";
    else
      echo "-1";
     
    mysqli_close($conn);
?>
