/**
 * @author Tanej (C0882384),
 * @author Sanjay (C0886438),
 * @author Tharun (C0886441)
 */

$(document).ready(function () {
  let username = redirectToLogin();

  $("#welcome-msg").html("Welcome " + username);

  $("#logout").on("click", function () {
    logout();
  });
  // valiadtion for Password
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails);
  $("#firstname").val(userDetails.first_name);
  $("#lastname").val(userDetails.last_name);
  $("#email").val(userDetails.email);
  $("#dob").val(userDetails.dob);
  $("#phone").val(userDetails.phone);
  $("#address").val(userDetails.address);
  $("#pin").val(userDetails.pin);

  $("#password").on("input", function () {
    var password = $(this).val();
    var cpassword = $("#cpassword").val();
    var uppercasePassword = /(?=.*?[A-Z])/;
    var lowercasePassword = /(?=.*?[a-z])/;
    var digitPassword = /(?=.*?[0-9])/;
    var symbolPassword = /(?=.*?[#?!@$%^&*-])/;
    var minEightPassword = /.{8,}/;
    if ($("#old_password").val() === "") {
      $(".password-msg")
        .addClass("invalid-msg")
        .text("Old password is required");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (!uppercasePassword.test(password)) {
      $(".password-msg").addClass("invalid-msg").text("At least one Uppercase");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (!lowercasePassword.test(password)) {
      $(".password-msg").addClass("invalid-msg").text("At least one Lowercase");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (!digitPassword.test(password)) {
      $(".password-msg").addClass("invalid-msg").text("At least one digit");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (!symbolPassword.test(password)) {
      $(".password-msg")
        .addClass("invalid-msg")
        .text("At least one special character");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (!minEightPassword.test(password)) {
      $(".password-msg").addClass("invalid-msg").text("Minimum length 8");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (cpassword.length > 0) {
      if (password != cpassword) {
        $(".cpassword-msg").addClass("invalid-msg").text("must be matched");
        $("#cpassword").addClass("invalid-input").removeClass("valid-input");
      } else {
        $(".cpassword-msg").empty();
        $("#cpassword").addClass("valid-input").removeClass("invalid-input");
      }
      $("#password").addClass("valid-input").removeClass("invalid-input");
      $(".password-msg").empty();
    } else {
      $(".password-msg").empty();
      $(this).addClass("valid-input").removeClass("invalid-input");
    }
  });
  // valiadtion for confirmation of  password

  $("#cpassword").on("input", function () {
    var password = $("#password").val();
    var cpassword = $(this).val();

    if (password === "" && cpassword.length !== 0) {
      $(".cpassword-msg").addClass("invalid-msg").text("password is required");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (password !== "" && cpassword !== password) {
      $(".cpassword-msg").addClass("invalid-msg").text("must be matched");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else {
      $(this).removeClass("invalid-input");
      $(".cpassword-msg").addClass("invalid-msg").text("");
    }
  });

  $("#user-form").submit(function () {
    let old_password = $("#old_password").val().trim();
    let new_password = $("#password").val().trim();
    let confirm_new_password = $("#cpassword").val().trim();
    if (new_password !== "") {
      if (
        old_password !== "" &&
        confirm_new_password !== "" &&
        new_password === confirm_new_password
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      $("#old_password").val("");
      return true;
    }
    return false;
  });
});
