const catchAsync = require("../utils/catchAsync");
const { httpStatus, message } = require("../utils/constant");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { servicesService } = require("../services");
const objectUtil = require("../utils/objectUtil");
const _ = require("lodash");

const createService = catchAsync(async (req, res) => {
  console.log("controler", req.body);
  const service = await servicesService.createServices(req.body);
  res.json(
    new ApiResponse(httpStatus.CREATED, message.SUCCESS, { service: service })
  );
});

const getServices = catchAsync(async (req, res) => {
  const filter = objectUtil.pick(req.query, ["filter"]);
  const options = objectUtil.pick(req.query, ["sortBy", "limit", "page"]);
  const service = await servicesService.queryServices(filter, options);
  console.log(service);
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, { service: service })
  );
});

const getServiceByUser = catchAsync(async (req, res) => {
  console.log("controler", req.params.userId);
  const service = await servicesService.getServiceByUser(req.params.userId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, { service: service })
  );
});

const getServiceById = catchAsync(async (req, res) => {
  console.log("Service controler get id", req.params.serviceId);
  const service = await servicesService.getService(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  res.json(
    new ApiResponse(httpStatus.OK, message.SUCCESS, { service: service })
  );
});

const updateServiceById = catchAsync(async (req, res) => {
  console.log("Service controler id", req.params.serviceId);
  const service = await servicesService.updateServiceById(
    req.params.serviceId,
    req.body
  );
  res.json(
    new ApiResponse(httpStatus.ACCEPTED, message.SUCCESS, { service: service })
  );
});
const deleteService = catchAsync(async (req, res) => {
  const service = await servicesService.deleteServiceById(req.params.serviceId);
  console.log(req.params.serviceId);
  res.json(
    new ApiResponse(httpStatus.ACCEPTED, message.SUCCESS, { service: service })
  );
});

module.exports = {
  createService,
  getServices,
  getServiceById,
  getServiceByUser,
  updateServiceById,
  deleteService,
};
