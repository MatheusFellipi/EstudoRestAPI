var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ownerRouter = require("./routes/owner");
var usersRoute = require("./routes/users");
var authRoute = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//conectando no banco de dados
require("../config/database")();

//rotas
app.use("/auth", authRoute);
app.use("/owner", ownerRouter);
app.use("/users", usersRoute);

// caso as rota nao existe
app.use(function (request, response, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, request, response, next) {
  response.status(err.status || 500).json({
    msg: err.message,
    error: err,
  });
});

module.exports = app;
