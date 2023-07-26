<?php
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
    print_r($result->num_rows);
   // Check for successful login
    if ($result->num_rows == 1) {
        // Redirect to product list page
        header("Location: productsList.html");
        exit();
    }
    // Closing the database connection
    $conn->close();
}
?>
