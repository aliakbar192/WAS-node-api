const { mongodb, mongoose } = require("../config/database");
const database = { mongodb, mongoose };
module.exports.User = require("./user.model");
const Token = require("./token.model");


// User.hasMany(Token, { foreignKey: "userId" });
// Token.belongsTo(User);
// User.hasMany(UserRole, { foreignKey: "userId" });
// UserRole.belongsTo(User);
