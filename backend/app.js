const express = require("express");
const errMiddleWare = require("./middleware/error")
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require("path");

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"});
}

const option = { origin: "https://66b79d9a712ea160d4d76410--dainty-kleicha-bd73b6.netlify.app", credentials: true, }
app.use(cors(option))
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//Route import
const product = require("./routes/productsroute")
const user = require("./routes/userroutes")
const order = require("./routes/orderroute");
const collection = require("./routes/collections");
const payment = require("./routes/paymentRoute")

//Using routes
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",collection);
app.use("/api/v1",payment)

app.use(errMiddleWare)

module.exports = app;
