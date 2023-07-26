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
  let id = getUrlVars()["id"] - 1;
  let type = getUrlVars()["type"];

  if (type === "ALL_PRODUCTS") {
    filtered_products = PRODUCTS;
  } else {
    filtered_products = PRODUCTS.filter((product) => product.type === type);
  }

  $("#product-image").attr("src", filtered_products[id].images[0].url);
  $("#product-brand").text(filtered_products[id].brand.label);
  $("#product-title").text(filtered_products[id].title);
  $("#product-rating").rateYo({
    rating: filtered_products[id].rating,
    readOnly: true,
    starWidth: "15px",
  });
  $("#product-review-count").text(
    "(" + filtered_products[id].ratingsCount + ")"
  );
  $("#product-warranty").text(
    "*" + (filtered_products[id].warrantyMessage || "No warranty")
  );
  $("#product-price").text(
    "$" +
      (filtered_products[id].currentPrice.value ||
        filtered_products[id].currentPrice.minPrice)
  );
  $("#product-available").text("Not Available");
  $("#product-available").css("color", "red");
  $("#product-count").text(filtered_products[id].quantity);
  if (filtered_products[id].quantity === 0) {
    $("#product-available").text("Not Available");
    $("#product-available").css("color", "red");
  } else {
    $("#product-available").text("Available");
    $("#product-available").css("color", "green");
  }

  const desc = $("#product-desc");
  filtered_products[id].featureBullets?.map((feature) => {
    desc.append(`<li>${feature.description}</li>`);
  });
});

function goToProductList() {
  window.history.back();
}
