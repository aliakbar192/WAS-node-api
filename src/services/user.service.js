const { httpStatus, message } = require("../utils/constant");
const { User } = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const createUser = async (userBody) => {
  let user = await User.findOne(
    { email: userBody.email },
    { userName: userBody.userName }
  );

  if (user) {
    if (user.userName === userBody.userName) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
    } else if (user.email === userBody.email) {
      throw new ApiError(
        httpStvalidPasswordatus.BAD_REQUEST,
        "Email already taken"
      );
    }
  }
  console.log(userBody);
  user = new User(
    _.pick(userBody, [
      "firstName",
      "lastName",
      "email",
      "userName",
      "password",
      "imageURL",
      "role",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(userBody.password, salt);
  console.log(user);
  user = await user.save();
  return user;
};
const isPasswordMatch = async function (password, userId) {
  const user = await User.findById(userId);
  console.log(userId);
  return bcrypt.compare(password, user.password);
};

const queryUsers = async (filter, options) => {
  const users = await User.find();
  return users;
};

const getUserById = async (userId) => {
  console.log(userId);
  let user = await User.findById(userId);
  console.log(user);
  return user;
};

const updateUserById = async (userId, userBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  const movie = await User.findByIdAndUpdate(
    userId,
    _.pick(userBody, [
      "firstName",
      "lastName",
      "email",
      "userName",
      "password",
      "imageURL",
      "role",
    ]),
    {
      new: true,
    }
  );

  // if (updateUserBody.email || updateUserBody.userName) {
  //   let otherUserQuery = [];
  //   if (updateUserBody.email) {
  //     otherUserQuery.push({ email: updateUserBody.email });
  //   }
  //   if (updateUserBody.userName) {
  //     otherUserQuery.push({ userName: updateUserBody.userName });
  //   }
  //   const otherUser = await User.findOne({
  //     where: {
  //       id: {
  //         [Op.ne]: user.id,
  //       },
  //       [Op.or]: otherUserQuery,
  //     },
  //     paranoid: false,
  //   });
  //   if (otherUser) {
  //     if (updateUserBody.userName === otherUser.userName) {
  //       throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  //     } else if (updateUserBody.email === otherUser.email) {
  //       throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  //     }
  //   }
  // }
  // Object.assign(user, updateUserBody);
  // await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  return user;
};

const gatUserByEmail = async (emailOrUserName) => {
  let users = await User.find(
    { email: emailOrUserName }
    // where: {
    //   $or: { email: emailOrUserName },
    // },
  );
  console.log("get emailuser ", users);
  return users;
};

const getUserByUserName = async (userName) => {
  let user = await User.findOne({
    where: {
      userName: userName,
    },
  });

  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUserName,
  gatUserByEmail,
  isPasswordMatch,
};
