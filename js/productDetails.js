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

$(function () {
  const id = getUrlVars()["id"] - 1;

  $("#product-image").attr("src", Products[id].images[0].url);
  $("#product-brand").text(Products[id].brand.label);
  $("#product-title").text(Products[id].title);
  $("#product-rating").rateYo({
    rating: Products[id].rating,
    readOnly: true,
    starWidth: "15px",
  });
  $("#product-review-count").text("(" + Products[id].ratingsCount + ")");
  $("#product-warranty").text("*" + Products[id].warrantyMessage);
  $("#product-price").text("$" + Products[id].currentPrice.value);
  $("#product-availavle").text("Not Available");
  $("#product-availavle").css("color", "red");

  const desc = $("#product-desc");
  Products[id].featureBullets?.map((feature) => {
    desc.append(`<li>${feature.description}</li>`);
  });
});

function goToProductList() {
  window.history.back();
}
