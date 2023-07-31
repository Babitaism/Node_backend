var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const connectionstr = require("./connection");
require("dotenv").config();
const cors = require("cors");
const User = require("./controllers/user");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Authentication = require("./controllers/authentication");
const Product = require("./controllers/product");
const loginNotRequired = require("./loginNotRequired");

app.use(
  cors({
    origin: process.env.FRONTENDORIGIN,
  })
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const TokenManager = require("./utility/tokenManager");
const SearchItems = require("./controllers/searchItems");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * MIDDLEWARE MAGIC HAPPENS HERE
 */

// /getTshirtImage\/[0-9]+$/

app.all("*", function (req, res, next) {
  let str = "/getImage";
  //TODO:: make it configurable change it one place and it should work in all place 
  
  if (loginNotRequired[req.path] || req.path.includes(str)) {
    next();
  } else {
    const authResp = Authentication.tokenDecode(
      req.headers["token"],
      process.env.JWT_SECRET_KEY
    );
    console.log('-------error on backend---------------', authResp)
    if (authResp.status == 200) {
      req.currentUser = authResp.message;
      req.connectionstr = connectionstr;
      next();
    } else {
      res.json(authResp)
    }
  }
});

/**
 * MIDDLEWARE MAGIC ENDS HERE
 *
 */
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

/** THESE ARE THE NEXT ROUTINE WHICH CALLED AFTER MIDDLEWARE */
app.post("/signup", User.signup.bind(User));
app.post("/login", Authentication.login.bind(Authentication));
app.post("/getUserDetail", User.getUserDetail.bind(User));
app.post("/products", Product.fetchAll.bind(Product));
app.get("/getImage?", Product.sendImage.bind(Product));
app.get("/searchItems" , SearchItems.search.bind(SearchItems))
app.get('/fetchProductInfo', SearchItems.searchImages.bind(SearchItems) )
app.use(cookieParser());


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
