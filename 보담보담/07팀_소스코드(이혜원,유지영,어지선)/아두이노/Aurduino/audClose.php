<?php
 // MySQL - DB 접속.
 
$conn = mysqli_connect("localhost", "root", "", "dbcapstonedesignserver");  
 
if (mysqli_connect_errno()){
    
    echo "MySQL 연결 오류: " . mysqli_connect_error();
    
    exit;
    
} else {
    
    echo "DB에 접속 성공.<br/>";
    
    $sql = "update tLocker set lckLock='1' where lckId='0202323'";
    $result = mysqli_query($conn, $sql);
    
    mysqli_close($conn);
    
}