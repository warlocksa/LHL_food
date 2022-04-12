// Client facing scripts here
$(document).ready(function () {
  console.log('Jquery works')
  $("#top").hide();
  $("#orderpage").hide();
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
  $("#order").click(function(){
    $("#orderpage").show("slow");
    $("#homepage").hide();
  })
  $("#home").click(function () {
    $("#homepage").show("slow");
    $("#orderpage").hide();
  })
//   $("#maindish").click(function () {
//     $(window).scroll(function () {
//       $('html, body').animate({
//         scrollTop: $(".maindish-list").offset().top
//       }, 200);
//     });
// })
})