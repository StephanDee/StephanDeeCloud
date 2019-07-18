/*
 * @Author: Stephan Dünkel 
 * @Date: 2019-07-18 15:01:36 
 * @Last Modified by: Stephan Dünkel
 * @Last Modified time: 2019-07-18 15:04:55
 *
 * The app.
 */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

// Import Routes
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/products", productsRoute);
app.use("/user", authRoute);

// Routes
app.get("/", (req, res) => {
  res.send("You have access to the Server!");
});

// Connect To DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the DB.");
});

app.listen(3000, err => {
  if (err !== undefined) {
    console.log("Error on startup,", err);
  } else {
    console.log("Listening on port 3000");
  }
});
