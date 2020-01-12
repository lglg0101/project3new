"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
// const serveFavicon = require('serve-favicon');

const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");

// ROUTERSSSSS
const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");
const postRouter = require("./routes/post");
const reviewRouter = require("./routes/review");
const profileRouter = require("./routes/userprofile");
const shopRouter = require("./routes/shopprofile");
const shopInfo = require("./routes/shopInfo");

const app = express();

// //DEPLOYMENT//

app.use(express.static(join(__dirname, "client/build")));
// app.use(serveFavicon(join(__dirname, 'public', 'client/build/favicon')));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 1000,
      sameSite: "lax",
      httpOnly: true
      //secure: process.env.NODE_ENV === "production"
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 1000
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

// app.use("/", indexRouter);
// app.use("/authentication", authenticationRouter);
// app.use("/post", postRouter);
// app.use("/review", reviewRouter);
// app.use("/userprofile", profileRouter);
// app.use("/shopprofile", shopRouter);
// app.use("/shops", shopInfo);

app.use("/api", indexRouter);
app.use("/api/authentication", authenticationRouter);
app.use("/api/post", postRouter);
app.use("/api/review", reviewRouter);
app.use("/api/userprofile", profileRouter);
app.use("/api/shopprofile", shopRouter);
app.use("/api/shops", shopInfo);

// // Catch missing routes and forward to error handler
//   next(createError(404));
// });

app.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "client/build/index.html"));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.json({ type: "error", error: { message: error.message } });
});

module.exports = app;
