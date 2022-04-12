// Client facing scripts here
$(document).ready(function () {
  console.log('Jquery works')
  $("#top").hide();
  $(window).scroll(function () {
    if($(this).scrollTop() !== 0) {
    $("#top").show("slow");
  } else {
    $("#top").hide();
  }
  })
  $("#top").click(function() {
    document.documentElement.scrollTop = 0;
  })
})