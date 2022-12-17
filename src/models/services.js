const bcrypt = require("bcrypt");
const { number, string } = require("joi");
const { mongoose } = require("../config/database");
const { objectId } = require("../validations/custom.validation");
const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      allowNull: false,
      required: true,
    },
    title: {
      type: String,
      allowNull: false,
      required: true,
    },
    catagory: {
      type: String,
      allowNull: false,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

exports.Service = Service;
