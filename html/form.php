<?php

//extracting the data from the html forms
if (isset($_POST['submit'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $dob = $_POST['dob'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $pin = $_POST['pin'];
    $password = $_POST['password'];
}

// database details
$host = 'localhost';
$username = "root";
$pass = "";
$dbname = "customer_details";

// creating a connection
$conn = mysqli_connect($host, $username, $pass, $dbname);

// checking connection
if (!$conn) {
    die("Connection failed!" . mysqli_connect_error());
}else{
    print_r("Connection established");
}

// // using sql to create a data entry query
$sql = "INSERT INTO customer_details_auth (first_name, last_name, email, phone, dob, address, pin, password)
    VALUES ('$firstname', '$lastname', '$email','$phone','$dob', '$address','$pin', '$password')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

print_r("end");
mysqli_close($conn);
 
header("Location: userLogin.html");
exit();

?>