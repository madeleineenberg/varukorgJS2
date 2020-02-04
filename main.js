$(document).ready(function() {
  $.getJSON("products.json", function(user) {
    let data = user.products;
    $.each(data, function(i, name) {
      $("#product-container").append(
        '<div class="card" style="width: 18rem;"' +
          "<div>" +
          "<img class='card-img-top'src=" +
          data[i].img +
          ">" +
          '<span class="product">' +
          data[i].name +
          "</span>" +
          "<br>" +
          '<span class="price">' +
          data[i].price +
          "</span>" +
          "<span>kr</span>" +
          '<button class="btn btn-warning">Köp</button>' +
          "</div>" +
          "</div>"
      );
    });

    $(".btn").click(addToCart);

    function addToCart(event) {
      event.preventDefault();
      let prod = $(this).parent();
      let litext = prod.find(".product");
      let liPrice = prod.find(".price");
      $("#cart-list").append(
        "<li class='cart-row'>" +
          litext.text() +
          " " +
          "<span class='product-price'>" +
          liPrice.text() +
          "</span>" +
          "<span>kr</span>" +
          " " +
          "<button class='remove-btn'>Ta bort</button>" +
          "</li>"
      );
      getTotalCost();
    }

    function getTotalCost() {
      let totalPrice = 0;
      $(".cart-row")
        .find(".product-price")
        .each(function() {
          totalPrice += parseFloat($(this).html());
        });
      document.getElementById("total").innerHTML =
        "<strong>SUMMA:</strong>" + totalPrice + "kr" + "<br>";
    }

    $("#order").click(function() {
      $("li").remove();
      $("#total").html("<strong>SUMMA: </strong>");
      alert("Tack för din beställning!");
    });

    $("button").click(function(event) {
      let button = event.target;
      console.log(button);
    });

    // function removeCartItem(event) {
    //   var buttonClicked = event.target;
    //   console.log(buttonClicked);
    //   buttonClicked.parentElement.parentElement.remove();
    //   getTotalCost();
    // }
  });
});
