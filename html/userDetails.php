<?php
header('Content-Type: application/json; charset=utf-8');
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
}
$email = $_GET['email'];

$sql = "SELECT * FROM customer_details_auth WHERE email = '$email' ";
// $result = mysqli_query($con, $sql);
// $row = mysqli_fetch_assoc($result);
// echo $row;
// echo json_encode(['status' => -1, 'message' => "Bad request", "data" => $row]);
// header("Location: productsList.html");
// print_r($result);
// print_r($_COOKIE["user_email"]);
// $con->close();
if ($stmt = $conn->prepare($sql)) {
    // Get the user ID from the JavaScript request
    $stmt->execute();
    $result = $stmt->get_result();

    // Return the user details as JSON
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(array("error" => "User not found"));
    }

    $stmt->close();
}

$conn->close();
?>