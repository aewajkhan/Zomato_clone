const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const imagePath = __dirname + "/images";
const userRoute = require("./userroute");
const restuarantRout = require("./restaurantRoute");
const locationRoute = require("./locationRoute");

const imageRoute = require("./imageroute");
const paymentRoute=require('./paymentroute')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.use('/payment',paymentRoute)
app.use("/images", express.static(imagePath));
app.use("/images", imageRoute);

app.use("/userdetail", userRoute);
app.use("/locations", locationRoute);
app.use("/restuarants", restuarantRout);

module.exports = app;
