const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const route = require("./admin2/routes/routes");
const router = require("./admin2/routes/categoryroutes");
const testimonialroutes = require("./admin2/routes/testimonialroutes");
const contactusroutes = require("./admin2/routes/contactusroutes");
const portfolioroutes = require("./admin2/routes/portfolioroutes");

app.use(cookieParser());
app.use("/", route);
app.use("/", router);
app.use("/", testimonialroutes);
app.use("/", contactusroutes);
app.use("/", portfolioroutes);

require("./admin2/conect/db");
app.listen(1010);
console.log("port 1010 is listing");
