const { httpStatus, message } = require("../utils/constant");
const { UserRole } = require("../models/userRole.model");
const { User } = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const createUserRole = async (req) => {
  console.log("services", req.userId);
  let user = await User.findById(req.userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
  }
  let usersroles = await UserRole.findById(req.userId);
  if (usersroles) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User Already attached with some role"
    );
  }
  let userrole = new UserRole({
    user: user,
    role: req.role,
  });
  let result = await userrole.save();
  return result;
};
const getUserRole = async (userId) => {
  let user = await User.findById(userId);
  console.log(user._id);
  let userrole = await UserRole.findOne({ "user._id": user._id }).project({
    role: 1,
  });
  return userrole;
};

module.exports = {
  createUserRole,
  getUserRole,
};
