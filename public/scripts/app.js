// Client facing scripts here
$(() => {
  const loadOrder = function (event) {
    $.ajax({ url: "api/widgets/cart", method: "GET" }).then(function () {
      // renderOrder(data);
    });
  };

  function createMealElement(data) {
    const $meal = $(`<article class="tweet">
    <header class = "all-tweet-header">
           <div class = "all-tweet-header-left">
            <img src=${data.name}>
            <a rel="author">${data.price}</a>
           </div>
           <a rel="author">${data.qty}</a>
    </header>
    </article>`);
    return $meal;
  }
  function renderOrder(arr) {
    const $orderContainer = $("#orderItem-container");
    $orderContainer.empty();
    for (const data of arr) {
      const $newmeal = createMealElement(data);
      $orderContainer.prepend($newmeal);
    }
    return $orderContainer;
  }

  $(".addCart").click(function () {
    const id = $(this).attr("id");
    console.log("mealid", id);
    const price = $(this).parent().siblings(".price").text();
    console.log("price", price);
    $.ajax({
      url: "api/widgets/cart",
      method: "POST",
      data: { id, price },
    }).then(() => {
      // render cart on nav bar
    });
  });
});
