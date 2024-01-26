require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 4000;
const mongoDB = require("./db");
mongoDB();
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://the-foodies-frontend.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options(
  "*",

  (req, res) => {
    res.status(200).send(); // Explicitly handle OPTIONS requests
  }
);

app.use(express.json());
app.use("/api/", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/Order_data"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
