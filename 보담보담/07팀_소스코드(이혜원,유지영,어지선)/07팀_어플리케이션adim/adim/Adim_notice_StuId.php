<?php
    //header("Content-Type: text/html;charset=UTF-8");
    $conn = mysqli_connect("localhost","root","","dbcapstonedesignserver");

    $query ="select stdId from tStudent";
    $result = mysqli_query($conn, $query);

    $data = array();   
    if($result){  
       while($row=mysqli_fetch_array($result)){
          array_push($data, array('stdId'=>$row[0] ));
    }
     $json = json_encode(array("webnautes"=>$data), JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
     echo $json;
}
     
mysqli_close($conn);
//공지부분 학번 가져오기위한 php임, 학생테이블 가지고옴
?>
