/**
 * @author Tanej (C0882384),
 * @author Sanjay (C0886438),
 * @author Tharun (C0886441)
 */

let userDetails = null;

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
    // console.log("Edit details ");
    let email = getCookie("user_email").replace("%40", "@");

    fetch("../html/userDetails.php?email=" + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("userDetails", JSON.stringify(data));
        window.location.href = "../html/userDetails.html";
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

function ResetURL() {
  window.history.replaceState(
    {},
    document.title,
    window.location.href.split("?")[0]
  );
}
