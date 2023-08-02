function getUrlVars() {
  var vars = {},
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars[hash[0]] = hash[1];
  }
  return vars;
}

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function redirectToLogin() {
  let username = getCookie("user_name");

  if (username === null || username === undefined) {
    location.href = "../html/userLogin.html";
  }
  return username;
}

function logout() {
  window.location.href = "../html/logout.php";
}

$(document).ready(function () {
  $("#welcome-msg").on("click", function () {
    console.log("Edit details ");
    let email = getCookie("user_email").replace("%40", "@");
    let userDetails;
    // $.ajax({
    //   type: "POST",
    //   url: "../html/userDetails.php",
    //   dataType: "json",
    //   data: { email: email },
    //   success: function (res) {
    //     if (!("error" in res)) {
    //       userDetails = res.result;
    //     } else {
    //       console.log(res.error);
    //     }
    //   },
    // });
    fetch("../html.userDetails.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // type
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(userDetails);
  });
});
