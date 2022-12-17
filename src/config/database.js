const { Mongoose, default: mongoose } = require("mongoose");
const config = require("./config");
const { environmentTypes } = require("../utils/enum");

const mongodb = new mongoose.connect(
  "mongodb+srv://db-admin:db-admin@db.ewtbwcp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
module.exports = { mongodb, mongoose };
