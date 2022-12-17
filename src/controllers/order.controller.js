const catchAsync = require("../utils/catchAsync");
const { httpStatus, message } = require("../utils/constant");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const orderServices = require("../services/order.services");
const objectUtil = require("../utils/objectUtil");
const _ = require("lodash");

const createOrder = catchAsync(async (req, res) => {
  const order = await orderServices.createOrders(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { order: order })
  );
});

const getOrders = catchAsync(async (req, res) => {
  const filter = objectUtil.pick(req.query, ["filter"]);
  const options = objectUtil.pick(req.query, ["sortBy", "limit", "page"]);
  const order = await orderServices.queryOrders(filter, options);
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { order: order }));
});

const getOrderByUser = catchAsync(async (req, res) => {
  console.log("order", req.params.userId);
  
  const order = await orderServices.getOrderByUser(req.params.userId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { order: order }));
});
const getOrderByEmp = catchAsync(async (req, res) => {
  console.log("order", req.params.empId);
  const order = await orderServices.getOrderByEmp(req.params.empId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { order: order }));
});

const getOrderById = catchAsync(async (req, res) => {
  console.log("order controler get id", req.params.orderId);
  const order = await orderServices.getOrder(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { order: order }));
});

const updateOrderById = catchAsync(async (req, res) => {
  console.log("order controler id", req.params.orderId);
  const order = await orderServices.updateOrderById(
    req.params.orderId,
    req.body
  );
  res.json(
    new ApiResponse(httpStatus.ACCEPTED, message.SUCCESS, { order: order })
  );
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderServices.deleteOrderById(req.params.orderId);
  console.log(req.params.orderId);
  res.json(
    new ApiResponse(httpStatus.ACCEPTED, message.SUCCESS, { order: order })
  );
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByUser,
  updateOrderById,
  deleteOrder,
  getOrderByEmp,
};
