require("dotenv").config();
const mongoose = require("mongoose");
// const mongoURI =
//   "mongodb://subhamitabiswas06:k49N1Fin76nGqBFV@ac-qzk0gll-shard-00-00.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-01.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-02.dh9xkqx.mongodb.net:27017/theFoodies?ssl=true&replicaSet=atlas-o1l7m1-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected successfully");

    const fetched_data = await mongoose.connection.db
      .collection("fooditems")
      .find({})
      .toArray();
    const food_category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();
    console.log("connected", fetched_data);
    global.fooditems = fetched_data;
    global.food_category = food_category;
  } catch (err) {
    console.error("---", err);
  }
};

module.exports = mongoDB;
