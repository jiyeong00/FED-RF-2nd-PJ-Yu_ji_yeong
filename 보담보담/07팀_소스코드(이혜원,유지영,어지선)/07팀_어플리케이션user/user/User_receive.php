<?php  
 
$link=mysqli_connect("localhost", "root", "", "dbcapstonedesignserver");  
if (!$link)
{  
    echo "MySQL 접속 에러 : ";
    echo mysqli_connect_error();
    exit();  
}  
 
mysqli_set_charset($link,"utf8"); 
 
 
$sql="select notstdId, notDate, notText from tNotice";
 
$result=mysqli_query($link,$sql);
$data = array();   
if($result){  
    
    while($row=mysqli_fetch_array($result)){
        array_push($data, 
            array('notstdId'=>$row[0],'notDate'=>$row[1],'notText'=>$row[2]
        ));
    }
 
    header('Content-Type: application/json; charset=utf8');
$json = json_encode(array("webnautes"=>$data), JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo $json;
 
}  
else{  
    echo "SQL문 처리중 에러 발생 : "; 
    echo mysqli_error($link);
} 
 
 
mysqli_close($link);  
   
?>