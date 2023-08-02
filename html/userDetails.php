<?php
header('Content-Type: application/json; charset=utf-8');

// database details
$host = 'localhost';
$username = "root";
$pass = "";
$dbname = "customer_details";

// creating a connection
$con = mysqli_connect($host, $username, $pass, $dbname);

// checking connection
if (!$con) {
    die("Connection failed!" . mysqli_connect_error());
}else {
    echo print_r('Connection established');
 }
$email = $_COOKIE["user_email"];
$sql = "SELECT * FROM customer_details_auth WHERE email = '$email' ";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);
echo $row;
header("Location: productsList.html");
print_r($result);
print_r($_COOKIE["user_email"]);

$con->close();
?>