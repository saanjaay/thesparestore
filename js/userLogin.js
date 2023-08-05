/**
 * @author Tanej (C0882384),
 * @author Sanjay (C0886438),
 * @author Tharun (C0886441)
 */

$(document).ready(function () {
  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    show: "blind",
    hide: "blind",
  });
  let urlValues = getUrlVars()["login"];
  if (urlValues && urlValues === "invalid") {
    $("#dialog-text").html("Invalid username or password");
    ResetURL();
  } else if (urlValues && urlValues === "created") {
    $("#dialog-text").html("User created successfully");
    ResetURL();
  } else {
    ResetURL();
    return;
  }

  $("#dialog").dialog("open");
});
