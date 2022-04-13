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
      method: "DELETE",
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
    }).then(() => { });
  });

});