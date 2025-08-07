<?php
 // MySQL - DB 접속.
 
$conn = mysqli_connect("localhost", "root", "", "dbcapstonedesignserver");  
 
if (mysqli_connect_errno()){
    
    echo "MySQL 연결 오류: " . mysqli_connect_error();
    
    exit;
    
} else {
    $qwe=$_GET["qwe"];
    $zxc=$_GET["zxc"];
//    $query ="select lckOutbreak from tLocker where lckId=$qwe";
    $query ="update tLocker set lckOutbreak=$zxc where lckId=$qwe";
    $result = mysqli_query($conn, $query);

    if($result->num_rows>0)
{     
while($row=$result->fetch_assoc())
 echo $row["lckOutbreak"];
}

    mysqli_close($conn);
    
}
?>
