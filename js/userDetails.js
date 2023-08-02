$(document).ready(function () {
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
    if (password.length == 0) {
      $(".password-msg").addClass("invalid-msg").text("Password is required");
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
    }
    //  else if (spacesPassword.test(password)) {
    //     $('.password-msg').addClass('invalid-msg').text('Whitespaces are not allowed');
    //     $(this).addClass('invalid-input').removeClass('valid-input');
    //  }
    else if (!minEightPassword.test(password)) {
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
    if (cpassword.length == 0) {
      $(".cpassword-msg")
        .addClass("invalid-msg")
        .text("Confirm password is required");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else if (cpassword != password) {
      $(".cpassword-msg").addClass("invalid-msg").text("must be matched");
      $(this).addClass("invalid-input").removeClass("valid-input");
    } else {
      $(".cpassword-msg").empty();
      $(this).addClass("valid-input").removeClass("invalid-input");
    }
  });
});
