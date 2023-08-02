function search_faq() {
  let look_out = document.getElementById("search").value;
  look_out = look_out.toLowerCase();
  let result = document.getElementsByClassName("qanda");

  for (i = 0; i < result.length; i++) {
    if (!result[i].innerHTML.toLowerCase().includes(look_out)) {
      result[i].style.display = "none";
    } else {
      result[i].style.display = "list-item";
    }
  }
}

$(function () {
  // this initializes the dialog (and uses some common options that I do)
  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    show: "blind",
    hide: "blind",
  });

  // next add the onclick handler
  $("#submit").click(function (e) {
    if ($("#form").valid()) {
      $("#dialog").dialog("open");
      return false;
    }
  });
});
