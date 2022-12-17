const bcrypt = require("bcrypt");
const { mongoose } = require("../config/database");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      allowNull: false,
      required: true,
    },
    lastName: {
      type: String,
      allowNull: false,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
  }
);

const User = mongoose.model("User", userSchema);

// User.addHook("afterValidate", async (user, options) => {
//   if (user.changed("password")) {
//     let { password } = user._previousDataValues.password
//       ? user._previousDataValues
//       : user.dataValues;
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//   }
//   if (user.changed("email")) {
//     user.email = user.email.toLowerCase();
//   }
// });

exports.User = User;
exports.userSchema = userSchema;
