// // Client facing scripts here
// // load .env data into process.env
// // require("dotenv").config();
// // const dotenv = require('dotenv')
// const buf = Buffer.from('BASIC=basic')
// const config = dotenv.parse(buf) // will return an object
// console.log(typeof config, config) // object { BASIC : 'basic' }
// // const twilio = require('twilio');
// console.log(process.env)
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken)
const dotenv = require("dotenv");
dotenv.config();
console.log(dotenv)

$(document).ready(function () {
  console.log('it works')
  $("#top").hide();
  $("#menu-page").hide();
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
  $("#menu-list").click(function(){
    // event.preventDefault();
    $("#menu-page").show("slow");
    $("#homepage").hide();
  })
  $("#home-list").click(function () {
    // event.preventDefault();
    $("#homepage").show("slow");
    $("#menu-page").hide();
  })
  // $("#place-order").click(() => {
  //   console.log(cl)
  //   client.messages
  //     .create({
  //       body: 'Hello order is coming',
  //       to: '+17808506903', // Text this number
  //       from: '+19894030471', // From a valid Twilio number
  //     })
  //     .then((message) => console.log(message.sid))
  //   setTimeout(() => {
  //     client.messages
  //       .create({
  //         body: 'Hello, your order is complete',
  //         to: '+17808506903', // Text this number
  //         from: '+19894030471', // From a valid Twilio number
  //       })
  //       .then((message) => console.log(message.sid))
  //   }, 3000);
  // })
});