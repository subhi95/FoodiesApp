// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://subhamitabiswas06:k49N1Fin76nGqBFV@ac-qzk0gll-shard-00-00.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-01.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-02.dh9xkqx.mongodb.net:27017/theFoodies?ssl=true&replicaSet=atlas-o1l7m1-shard-0&authSource=admin&retryWrites=true&w=majority';

// const mongoDB = async () => {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         if (err) console.log('---', err);
//         else {

//             console.log("Connected successfully");
//             const fetched_data = await mongoose.connection.db.collection("fooditems");
//             fetched_data.find({}).toArray(async function (err, data) {

//                 const food_category = await mongoose.connection.db.collection("foodCategory");
//                 food_category.find({}).toArray(function (err, cat_data) {

//                     if (err)
//                         console.log(err);
//                     else
//                         global.fooditems = data;
//                     global.food_category = cat_data;
//                 })

//             })

//         }

//     });
// }

// module.exports = mongoDB;

const mongoose = require("mongoose");
const mongoURI =
  "mongodb://subhamitabiswas06:k49N1Fin76nGqBFV@ac-qzk0gll-shard-00-00.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-01.dh9xkqx.mongodb.net:27017,ac-qzk0gll-shard-00-02.dh9xkqx.mongodb.net:27017/theFoodies?ssl=true&replicaSet=atlas-o1l7m1-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
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

    global.fooditems = fetched_data;
    global.food_category = food_category;
  } catch (err) {
    console.error("---", err);
  }
};

module.exports = mongoDB;
