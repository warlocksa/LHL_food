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

  //

  const TwilioSMS = (function ($) {
    const accountSid = "AC2e8b9cec1c0364da055ec16b66553f2d"; // replace with your account SID
    const authToken = "74b9ca9af5e13abc7455da85e4f3f5bb"; // replace with your auth token

    const testEndpoint =
      "https://api.twilio.com/2010-04-01/Accounts/" +
      accountSid +
      "/SMS/Messages.json";
    const liveEndpoint =
      "https://api.twilio.com/2010-04-01/Accounts/" +
      accountSid +
      "/Messages.json";

    const sendMessage = function (to, from, body, successCallback, failCallback) {
      const data = {
        To: to,
        From: from,
        Body: body,
      };

      $.ajax({
        method: "POST",
        url: testEndpoint,
        //url: liveEndpoint, // uncomment this in production and comment the above line
        data: data,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", // !
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Basic " + btoa(accountSid + ":" + authToken) // !
          );
        },
        success: function (data) {
          console.log("Got response: %o", data);

          if (typeof successCallback == "function") successCallback(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Request failed: " + textStatus + ", " + errorThrown);

          if (typeof failCallback == "function")
            failCallback(jqXHR, textStatus, errorThrown);
        },
      });
    };
    return {
      sendMessage: sendMessage,
    };
  })(jQuery);


  TwilioSMS.sendMessage(
    '+17808506903',
    '+19894030471', // Twilio allowed test number
    'Hey Jenny! Good luck on the bar exam!',
    function ok() {
      console.log("Message sent!");
    },
    function fail() {
      console.log("Failed to send your message!");
    }
  );

});