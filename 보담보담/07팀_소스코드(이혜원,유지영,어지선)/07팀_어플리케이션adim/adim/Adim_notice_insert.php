<?php
  // 관리자 공지송신부분 php
    //header("Content-Type: text/html;charset=UTF-8");
    $conn = mysqli_connect("localhost","root","","dbcapstonedesignserver");
    $notText="'".$_POST['notText']."'";
    $query ="Insert Into tNotice (notStdId, notMngId, notDate, notText) Values ('201837204', '201601283', default,".$notText.")";
    $result = mysqli_query($conn, $query);
     
    if($result)
      echo "1";
    else
      echo "-1";
     
    mysqli_close($conn);
?>
