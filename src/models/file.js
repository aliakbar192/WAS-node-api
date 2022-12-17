const bcrypt = require("bcrypt");
const { mongoose } = require("../config/database");
const { objectId } = require("../validations/custom.validation");
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: Array,
      allowNull: false,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);

const File = mongoose.model("file", fileSchema);

exports.file = File;
