$(function () {
  let username = redirectToLogin();

  $("#welcome-msg").html("Welcome " + username);

  $("#logout").on("click", function () {
    logout();
  });

  $("#goto-productsList").attr("href", "productsList.html");

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
