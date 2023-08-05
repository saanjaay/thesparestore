/**
 * @author Tanej (C0882384),
 * @author Sanjay (C0886438),
 * @author Tharun (C0886441)
 */

function renderCards(Products, username) {
  $("#card-container").empty();

  $(function () {
    setTimeout(function () {
      $("#welcome").slideToggle("fast");
    }, 2000);
    sessionStorage.setItem("popState", "shown");
  });
  Products.map((product, i) => {
    const id = i + 1;
    $("#card-container").append(
      '<div class="card" id="ID"> \
      <div class="card-image"> \
        <img id="product-image-ID" /> \
      </div> \
      <div class="card-content"> \
        <h3 id="product-title-ID"></h3> \
        <div class="card-footer"> \
          <div class="rating-container"> \
            <div id="product-rating-ID"></div>\
            <p id="product-review-count-ID">(32)</p>\
          </div> \
          <h2 id="product-price-ID"></h2> \
          <div class="quantity-container"> \
            <p id=product-count-ID></p>\
            <span>-</span>\
            <p id="product-available-ID"></p> \
          </div> \
        </div> \
      </div> \
    </div>'.replaceAll("ID", id.toString())
    );

    $("#product-image-" + id).attr("src", product.images[0]?.url);
    $("#product-title-" + id).text(product.title);
    $("#product-rating-" + id).rateYo({
      rating: product.rating,
      readOnly: true,
      starWidth: "15px",
    });
    $("#product-rating-" + id);
    $("#product-price-" + id).text(
      "$" + (product.currentPrice.value || product.currentPrice.minPrice)
    );
    $("#product-count-" + id).text(product.quantity);
    $("#product-review-count-" + id).text("(" + product.ratingsCount + ")");
    if (product.quantity === 0) {
      $("#product-available-" + id).text("Not Available");
      $("#product-available-" + id).css("color", "red");
    } else {
      $("#product-available-" + id).text("Available");
      $("#product-available-" + id).css("color", "green");
    }
  });

  $("#search-text").val("");

  $(".card").on("click", (e) => {
    location.href =
      "../html/productDetails.html" +
      "?id=" +
      e.currentTarget.id +
      "&type=" +
      $("#selector").val();
  });

  $("#card-container").searcher({
    itemSelector: ".card",
    textSelector: "div",
    inputSelector: "#search-text",
    toggle: function (item, containsText) {
      if (containsText) $(item).fadeIn();
      else $(item).fadeOut();
    },
  });
}

$(document).ready(function () {
  let username = redirectToLogin();

  $("#welcome-msg").html("Welcome " + username);

  renderCards(PRODUCTS, username);

  $("#logout").on("click", function () {
    logout();
  });

  $("#selector").on("change", function (event) {
    console.log(event.currentTarget.value);
    if (event.currentTarget.value === "BRAKES") {
      final_products = PRODUCTS.filter((product) => product.type === "BRAKES");
    } else if (event.currentTarget.value === "BATTERY") {
      final_products = PRODUCTS.filter((product) => product.type === "BATTERY");
    } else if (event.currentTarget.value === "HEADLIGHT") {
      final_products = PRODUCTS.filter(
        (product) => product.type === "HEADLIGHT"
      );
    } else if (event.currentTarget.value === "TIRES") {
      final_products = PRODUCTS.filter((product) => product.type === "TIRES");
    } else if (event.currentTarget.value === "WHEELS") {
      final_products = PRODUCTS.filter((product) => product.type === "WHEELS");
    } else if (event.currentTarget.value === "ALL_PRODUCTS") {
      final_products = PRODUCTS;
    }
    renderCards(final_products, username);
  });
});
