$(document).ready(function() {
    let urlValues = getUrlVars()["login"];
    console.log(urlValues);
    if (urlValues && urlValues === "invalid"){
        alert("Invalid username or password");
    }
});