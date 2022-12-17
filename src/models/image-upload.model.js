const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageTitle: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
