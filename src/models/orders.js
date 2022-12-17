const bcrypt = require("bcrypt");
const { mongoose } = require("../config/database");
const { objectId } = require("../validations/custom.validation");
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      allowNull: false,
      required: true,
      unique: false,
    },
    serviceId: {
      type: objectId,
      allowNull: false,
      required: true,
      unique: false,
    },
    location: {
      type: Array,
      allowNull: false,
      required: true,
      unique: false,
    },
    status: {
      type: String,
      required: true,
      unique: false,
    },
    payment: {
      type: String,
      required: true,
      unique: false,
    },
    phnno: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
