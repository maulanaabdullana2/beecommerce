const express = require("express");
const morgan = require("morgan");
const router = require("./router");
const errorHendler = require("./controllers/Errorcontrollers");
const ApiError = require("./utils/Apierror");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});


app.use(errorHendler);

module.exports = app;