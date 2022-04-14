// // Client facing scripts here

$(document).ready(function () {
  console.log('it works')

  // when page scroll, the top button appear
  $(window).scroll(function () {
    if($(this).scrollTop() !== 0) {
    $("#top").show("slow");
  } else {
    $("#top").hide();
  }
  })
  // click the top button, back to the top
  $("#top").click(function() {
    document.documentElement.scrollTop = 0;
  })
  $("#place-order").click(() => {
    console.log($('#total').text())
    const num = parseInt($('#total').text());
    if (num === 0) {
      alert("The cart is rmpty")
      return 
    } else {
    console.log('message is sending.')
    $.ajax({
      method: 'GET',
      url: '/text',
      data: {},
    })
      .done(function () {
        console.log('message is sent.')
      })}
  });
  $('#twitter-button').on('click', function () {
    // Initialize with your OAuth.io app public key
    OAuth.initialize('rz9Hgf5YhQgwri-SSFdU7ECPsLQ');
    // Use popup for OAuth
    OAuth.popup('twitter').then(twitter => {
      console.log(twitter);
      // Retrieves user data from oauth provider
      console.log(twitter.me());
    });
  })
});