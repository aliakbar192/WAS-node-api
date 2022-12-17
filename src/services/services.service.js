const { httpStatus, message } = require("../utils/constant");
const { Service } = require("../models/services");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const multer = require("multer");
const express = require("express");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

const createServices = async (serviceBody) => {
  let service = new Service({
    userId: serviceBody.userId,
    title: serviceBody.title,
    catagory: serviceBody.catagory,
    description: serviceBody.description,
    price: serviceBody.price,
    imageURL: serviceBody.imageURL,
    rating: serviceBody.rating,
  });
  console.log(service);
  let result = await service.save();
  return result;
};

const queryServices = async (filter, options) => {
  const services = await Service.find();
  return services;
};
const getService = async (serviceId) => {
  console.log(serviceId);
  let service = await Service.findById(serviceId);

  return service;
};

const getServiceByUser = async (userId) => {
  console.log(userId);
  let service = await Service.find({ userId });
  console.log(service);
  return service;
};

const updateServiceByUserId = async (userId, serviceBody) => {
  const user = await Service.findById({ userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }

  const service = await Service.findByIdAndUpdate(
    user._id,
    _.pick(serviceBody, [
      "title",
      "description",
      "catagory",
      "price",
      "rating",
      "imageURL",
      "approved",
    ]),
    {
      new: true,
    }
  );
  return service;
};
const updateServiceById = async (serviceId, serviceBody) => {
  console.log(serviceBody);
  console.log(serviceId);
  const serv = await Service.findById(serviceId);
  console.log(serv);
  const service = await Service.findByIdAndUpdate(
    serviceId,
    _.pick(serviceBody, [
      "title",
      "description",
      "catagory",
      "price",
      "role",
      "rating",
      "imageURL",
      "approved",
    ]),
    {
      new: true,
    }
  );
  console.log(service);
  return service;
};
const deleteServiceById = async (serviceId) => {
  const service = await Service.findByIdAndDelete(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
  }
  return service;
};

// const deleteServiceByUserId = async (userId) => {
//   const service = await Service.findByIdAndDelete({ userId });
//   if (!service) {
//     throw new ApiError(httpStatus.NOT_FOUND, message.NOT_FOUND);
//   }
//   return service;
// };

module.exports = {
  createServices,
  queryServices,
  getService,
  getServiceByUser,
  updateServiceByUserId,
  updateServiceById,
  // deleteServiceByUserId,
  deleteServiceById,
};
