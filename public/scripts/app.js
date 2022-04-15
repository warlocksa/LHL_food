// Client facing scripts here

$(() => {
  $(".cart").click(function () {
    window.location.href = "http://localhost:8080/api/widgets/cart";
  });
  $("#ongoing-button").hide();
  $("#complete-button").hide();
  $("#ongoing-button").click(() => {
    $("#new-order").prependTo("#complete-order");
    $("#ongoing-button").hide();
    $("#complete-button").show();
  });
  $(".accept").click(() => {
    console.log("restaurant sending message");
    const meals = $(".meal-content-new").text();
    const order_id = $(".order-id-new").text();
    const time = `${$("#myselect").val()}min`;
    $("#accept-button").hide();
    $("#ongoing-button").show();
    $("#estimated-time").hide();
    $("#myselect").hide();
    console.log("meals", meals);
    console.log("order_id ", order_id);
    console.log("time", time);
    const data = { meals, order_id, time };
    console.log(data);
    $.ajax({
      method: "POST",
      url: "/restaurant",
      data: { data: data },
    }).done(function () {
      console.log("message is sent.");
    });
  });
  //
  $("#place-order").click(() => {
    console.log($("#total").text());
    if ($("#total").text() === "$ 0.00") {
      alert("The cart is empty");
      return;
    } else {
      window.location.href =
        "http://localhost:8080/api/widgets/order_confirmation";
      console.log("customer sending message");
      $.ajax({
        method: "GET",
        url: "/text",
        data: {},
      }).done(function () {
        console.log("message is sent.");
      });
    }
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
    const price = $(this).parent().siblings(".price").text().slice(1);
    console.log("price", price);
    $.ajax({
      url: "/api/widgets/cart",
      method: "POST",
      data: { id, price },
    }).then(() => {});
    $("#addMessage").text("Added it successful").fadeIn();
    setTimeout(function () {
      $("#addMessage").hide();
    }, 1000);
  });
});
