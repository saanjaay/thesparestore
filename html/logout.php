 <!-- this file is executed when the user press logout -->
<?php
setcookie("user_name", "undefined", time() - 10);
setcookie("user_email", "undefined", time() - 10);
session_destroy();
header("Location:./userLogin.html");
?>