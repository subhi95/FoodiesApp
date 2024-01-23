require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 4000;
const mongoDB = require("./db");
mongoDB();

// mongoose.connect(process.env.MONGODB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// CORS configuration

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
