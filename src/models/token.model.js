const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const { mongodb } = require("../config/database");
const { userSchema } = require("./user.model");
const { objectId } = require("../validations/custom.validation");
const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    key: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      defaultValue: "AUTH",
    },
    loginAt: {
      type: String,
    },
    lastSeenAt: {
      type: String,
    },
    logoutAt: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    blacklistedAt: {
      type: Date,
    },
  },
  {
    modelName: "token",
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true,
    updatedAt: false,
    createdAt: "loginAt",
    deletedAt: "blacklistedAt",
  }
);

const Token = mongoose.model("Token", tokenSchema);
//     Token.addHook('beforeSave', async (token, options) => {
//         if (token.changed('key')) {
//             const key = token.dataValues.key;
//             if(!key) {
//                 return;
//             }
//             const salt = await bcrypt.genSalt(10);
//             token.key = await bcrypt.hash(key+'', salt);
//         }
//     });

//     Token.prototype.isKeyMatch = async function (key) {
//         return bcrypt.compare(key, this.key);
//     };

//     return Token;
// };
exports.Token = Token;
