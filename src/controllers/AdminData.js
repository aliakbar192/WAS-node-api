const catchAsync = require("../utils/catchAsync");
const { httpStatus, message } = require("../utils/constant");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const orderServices = require("../services/order.services");
const objectUtil = require("../utils/objectUtil");
const _ = require("lodash");
const adminDataServices = require("../services/adminData.services");

const getData = catchAsync(async (req, res) => {
  const filter = objectUtil.pick(req.query, ["filter"]);
  const options = objectUtil.pick(req.query, ["sortBy", "limit", "page"]);
  const data = await adminDataServices.getData(filter, options);
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { data: data }));
});
const getEmpData = catchAsync(async (req, res) => {
  console.log("order", req.params.userId);
  const data = await adminDataServices.getEmpData(req.params.userId);
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { data: data }));
});

module.exports = {
  getData,
  getEmpData,
};
