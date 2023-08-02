<?php
session_start();
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input from the form
    $email = $_POST["email"];
    $password = $_POST["password"];

    // database details
    $host = 'localhost';
    $username = "root";
    $pass = "";
    $dbname = "customer_details";

    // creating a connection
    $conn = mysqli_connect($host, $username, $pass, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to check the username and password
    $sql = "SELECT * FROM customer_details_auth WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    $row = $result->fetch_array();
    print_r($result->num_rows);
    $conn->close();
    // Check for successful login
    if ($result->num_rows == 1) {
        // Redirect to product list page
        $username = $row['first_name'];
        setcookie("user_name", $username, time()+1000*365*24*60*60);
        setcookie("user_email", $email);
        header("Location:./productsList.html?username=$username");
        exit();
    }else{
        header("Location:./userLogin.html?login=invalid");
        setcookie("user_name", "undefined", time()-10);
        setcookie("user_email", "undefined", time()-10);
        exit();
    }
}
?>