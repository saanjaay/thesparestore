<?php
session_start();
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
    $oldPassword = $_POST['old_password'];
    $custom_action = $_POST['custom_action'];
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
} else {
    print_r("Connection established");
}

if ($custom_action === "" || $custom_action === "insert") {
    // // using sql to create a data entry query
    $sql = "INSERT INTO customer_details_auth (first_name, last_name, email, phone, dob, address, pin, password)
    VALUES ('$firstname', '$lastname', '$email','$phone','$dob', '$address','$pin', '" . hash('md5', $password) . "')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        mysqli_close($conn);
        echo '<script type="text/javascript">window.location.href = "userLogin.html?login=created";</script>';
        // header("Location: userLogin.html");
        exit();
    } else {
        if (mysqli_errno($conn) == 1062) {
            mysqli_close($conn);
            echo '<script type="text/javascript">window.location.href = "userRegistration.html?error=email";</script>';
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
            mysqli_close($conn);
        }
    }
} else if ($custom_action === "update") {
    $sql = "SELECT password FROM customer_details_auth WHERE email = '$email' ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $final_password = $row['password'];
    if ($oldPassword !== "") {
        $sql = "SELECT password FROM customer_details_auth WHERE email = '$email' ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($final_password === hash("md5", $oldPassword)) {
            $sql = "UPDATE  customer_details_auth set first_name = '$firstname', last_name = '$lastname', phone = '$phone', dob = '$dob', address = '$address', pin = '$pin', password = '" . hash('md5', $password) . "' WHERE email = '$email'";
            $final_password = hash("md5", $oldPassword);
        } else {
            echo '<script type="text/javascript">alert("ERR:  Invalid Old Password"); window.location.href = "userDetails.html";</script>';
        }
    } else {
        $sql = "UPDATE customer_details_auth set first_name = '$firstname', last_name = '$lastname', phone = '$phone', dob = '$dob', address = '$address', pin = '$pin' WHERE email = '$email'";
    }
    if (mysqli_query($conn, $sql)) {
        echo "Record Updated successfully";
        mysqli_close($conn);
        // The submitted form data, encoded as query-string-style
        $body = "email='$email'&password='$final_password'";
        $_POST['email'] = $email;
        $_POST['password'] = $final_password;
        include 'login.php';
        exit();
    } else {
        print_r(mysqli_error($conn));
    }
    print_r($sql);
    //print_r($_POST);
}
?>