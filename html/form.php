<?php

    echo "Hello from php";
    //extracting the data from the html forms
    if(isset($_POST['submit']))
    {
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $dob = $_POST['dob'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];
        $pin = $_POST['pin'];
        $password = $_POST['password'];
    }
    echo '<script>console.log("Your stuff here")</script>';

    // database details
    $host = 'localhost';
    $username = "root";
    $pass = "";
    $dbname = "customer_details";
    
    // creating a connection
    $con = mysqli_connect($host, $username, $pass, $dbname);

    // checking connection
    if (!$con)
    {
        die("Connection failed!" . mysqli_connect_error());
    }

// creating a connection
$con = mysqli_connect($host, $username, $password, $dbname);

// to ensure that the connection is made
if (!$con) {
    die("Connection failed!" . mysqli_connect_error());
}

// using sql to create a data entry query
$sql = "INSERT INTO customer_details_auth (first_name, last_name, email, phone, dob, address, pin, password)
    VALUES ('$firstname', '$lastname', '$email','$dob', '$phone', '$address','$pin', '$password')";

    if($rs)
    {
        //clsoing the database connection
        mysqli_close($con);
        header("Location: userLogin.html");
        exit();
    }
    
?>
