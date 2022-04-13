// Client facing scripts here

$(() => {
  $(".cart").click(function () {
    window.location.href = "http://localhost:8080/api/widgets/cart";
  });
  //remove item from cart
  $(".remove").click(function () {
    const meal_id = $(this).attr("id");
    $.ajax({
      url: "/api/widgets/cart/delete",
      method: "POST",
      data: { id: meal_id },
    }).then(() => {
      let subtotal = parseInt(
        $(this)
          .parent()
          .siblings(".subtotal")
          .children()
          .first()
          .text()
          .slice(1)
      );
      let total = parseInt($("#total").text().slice(1));
      console.log(total);
      $("#total").text(`$ ${total - subtotal}.00`);
      $(this).parent().parent().remove();
    });
  });

  // const loadOrder = function (event) {
  //   $.ajax({ url: "api/widgets/cart", method: "GET" }).then(function () {
  //     // renderOrder(data);
  //   });
  // };

  // function createMealElement(data) {
  //   const $meal = $(`<article class="tweet">
  //   <header class = "all-tweet-header">
  //          <div class = "all-tweet-header-left">
  //           <img src=${data.name}>
  //           <a rel="author">${data.price}</a>
  //          </div>
  //          <a rel="author">${data.qty}</a>
  //   </header>
  //   </article>`);
  //   return $meal;
  // }
  // function renderOrder(arr) {
  //   const $orderContainer = $("#orderItem-container");
  //   $orderContainer.empty();
  //   for (const data of arr) {
  //     const $newmeal = createMealElement(data);
  //     $orderContainer.prepend($newmeal);
  //   }
  //   return $orderContainer;
  // }

  //add item to cart
  $(".addCart").click(function () {
    const id = $(this).attr("id");
    console.log("mealid", id);
    const price = $(this).parent().siblings(".price").text();
    console.log("price", price);
    $.ajax({
      url: "/api/widgets/cart",
      method: "POST",
      data: { id, price },
    }).then(() => {});
  });
});
