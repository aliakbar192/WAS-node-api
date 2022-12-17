const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("./cors");
const passport = require("passport");
const { jwtStrategy } = require("./passport");
const { httpStatus, message } = require("../utils/constant");
const config = require("./config");
const morgan = require("./morgan");
const routes = require("../routes");
const ApiError = require("../utils/ApiError");
const path = require("path");
const crone = require("./crone");
const { environmentTypes } = require("../utils/enum");
const mongoose = require("mongoose");

const app = express();

if (config.server.env !== environmentTypes.TEST) {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// setup database
// database.authenticate();
// database.sync();

// setup SMTP

// Setup BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CookieParser
app.use(cookieParser());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// setup cors
cors(app);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

mongoose
  .connect(
    "mongodb+srv://db-admin:db-admin@db.ewtbwcp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected to database"))
  .catch(() => console.error("could not connect"));

// api routes
app.use("/api", routes);

// public directories
app.use("public", express.static(path.join(__dirname, "../../public")));

//Start Crone-job
crone.start();

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND));
});

// handle error
require("./error")(app);

module.exports = app;
