// load .env data into process.env
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// Web server config
const PORT = process.env.PORT || 8080;
const db = require("./database");
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["secure", "checker", "keys"],
    // Cookie Option
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

//endpoint for text message
app.post("/restaurant", (req, res) => {
  const data = req.body.data;
  console.log(data);
  console.log(data.meals);
  client.messages
    .create({
      body: `Lanzhou Ramen: Hello! Thanks for ordering from us. Your order id is ${data.order_id} and meals of ${data.meals} will take about ${data.time} to prepare.`,
      to: "+17808506903", // Text this number
      from: "+19894030471", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
});

app.get("/text", (req, res) => {
  client.messages
    .create({
      body: `Hello, you have an incoming order`,
      to: "+17808506903", // Text this number
      from: "+19894030471", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
});

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.getAllMeals().then((meals) => {
    const userId = req.session.userId;
    if (userId) {
      db.getUserWithId(userId).then((user) => {
        res.render("index", { meals: meals, user: user });
      });
      return;
    }
    res.render("index", { meals: meals, user: userId });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});