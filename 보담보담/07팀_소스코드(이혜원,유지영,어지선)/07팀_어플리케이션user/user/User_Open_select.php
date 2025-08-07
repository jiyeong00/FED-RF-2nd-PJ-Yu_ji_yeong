<?php
//안드로이드에서 비밀번호 비교용 php (open)
    //header("Content-Type: text/html;charset=UTF-8");
    $conn = mysqli_connect("localhost","root","","dbcapstonedesignserver");

    $query ="select lckId,lckPassword from tLocker where lckId='0202323'";
    $result = mysqli_query($conn, $query);

    $data = array();   
    if($result){  
       while($row=mysqli_fetch_array($result)){
          array_push($data, array('lckId'=>$row[0],'lckPassword'=>$row[1] ));
    }
     $json = json_encode(array("webnautes"=>$data), JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
     echo $json;
}
     
mysqli_close($conn);
?>
