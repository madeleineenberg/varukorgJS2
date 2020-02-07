$(document).ready(function() {
  $.getJSON("products.json", function(user) {
    let data = user.products;
    $.each(data, function(i, name) {
      $("#product-container").append(
        "<div class='product-card'>" +
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
          "<br>" +
          '<input type="number" max="10" min="1" value="1" class="product-qty" />' +
          "<br>" +
          "<br>" +
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
      let listPrice = prod.find(".price");
      let productQty = prod.find("input").val();
      let $img = prod.find(".card-img-top").attr("src");

      $("#cart-list").append(
        "<li class='cart-row'>" +
          "<div class='img-container' style='display: none;'>" +
          $img +
          "</div>" +
          "<span class='product-name'>" +
          litext.text() +
          "</span>" +
          " " +
          "<span class='product-price'>" +
          listPrice.text() +
          "</span>" +
          "<span>kr</span>" +
          " " +
          '<input type="number" max="10" min="1" value="' +
          productQty +
          '" class="input-qty" />' +
          "<button class='remove-btn'>Ta bort</button>" +
          "</li>"
      );

      $(".product-qty").val("1");
      $(".remove-btn").click(removeCartItem);
      getTotalCost();
      $(".input-qty").on("input", getTotalCost);
    }

    function getTotalCost() {
      let totalPrice = 0;
      let $cartRow = $(".cart-row");
      //loopar över varje rad i varukorgen
      $($cartRow).each(function() {
        //hittar priset och antalet på this.cartrow för varje loop
        let $prodprice = $(this).find(".product-price");
        let $prodqty = $(this)
          .find("input")
          .val();
        // gör om från strängar till floats med parseFloat
        let $pPrice = parseFloat($prodprice.text());
        let $pQty = parseFloat($prodqty);
        totalPrice += $pPrice * $pQty;
      });
      //lägger till den nya totalen på sidan
      document.getElementById("total").innerHTML =
        "<strong>SUMMA: </strong>" + totalPrice + "kr" + "<br>";
    }

    $("#order").click(function() {
      let $cartRow = $(".cart-row");
      if ($cartRow.length === 0) {
        alert("Din varukorg är tom!");
        return false;
      } else {
        storeToLocalStorage();
        $("li").remove();
        $("#total").html("<strong>SUMMA: </strong>");
        alert("Tack för din beställning!");
      }
    });

    function storeToLocalStorage() {
      let arrayStorage = [];
      let $totalCost = $("#total").text();
      let $cartRow = $(".cart-row");

      $($cartRow).each(function() {
        let $prodName = $(this)
          .find(".product-name")
          .text();
        let $prodPrice = $(this)
          .find(".product-price")
          .text();
        let $prodQty = $(this)
          .find("input")
          .val();
        let $img = $(this)
          .find(".img-container")
          .text();

        let $prodInfo = {
          name: $prodName,
          price: $prodPrice,
          qty: $prodQty,
          img: $img
        };

        arrayStorage.push($prodInfo);
      });

      console.log($totalCost);

      localStorage.setItem("arrayStorage", JSON.stringify(arrayStorage));
      localStorage.setItem("total", JSON.stringify($totalCost));
    }

    function removeCartItem(event) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      getTotalCost();
    }

    $("#remove-all").click(function() {
      $("ul").empty();
      getTotalCost();
    });
  });
});
