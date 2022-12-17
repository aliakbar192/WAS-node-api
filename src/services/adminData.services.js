const { httpStatus, message } = require("../utils/constant");
const { Order } = require("../models/orders");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const userServices = require("../services/user.service");
const servicesservice = require("../services/services.service");
const orderservices = require("../services/order.services");
const getData = async (filter, options) => {
  const totalUser = (await userServices.queryUsers()).length;
  const totalempUser = (await userServices.queryUsers({ role: "employee" }))
    .length;
  const totalservices = (await servicesservice.queryServices()).length;
  const totalactivorder = (await orderservices.queryOrders()).length;
  const data = {
    totalUser,
    totalempUser,
    totalservices,
    totalactivorder,
  };
  return data;
};
const getEmpData = async (userId) => {
  const totalUser = (await userServices.queryUsers()).length;
  const totalactiveservices = (
    await servicesservice.getServiceByUser(userId, { approved: true })
  ).length;
  const totalpendingservices = (
    await servicesservice.getServiceByUser(userId, { approved: false })
  ).length;
  const totalactivorder = (await orderservices.getOrderByUser(userId)).length;
  const data = {
    totalUser,
    totalactiveservices,
    totalpendingservices,
    totalactivorder,
  };
  return data;
};
module.exports = {
  getData,
  getEmpData,
};
