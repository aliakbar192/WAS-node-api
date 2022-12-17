const Joi = require("joi");
const joiObjectid = require("joi-objectid");
Joi.objectId = require("joi-objectid")(Joi);
const { objectId } = require("./custom.validation");
const createService = {
  body: Joi.object().keys({
    userId: Joi.objectId().required(),
    catagory: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number(),
    approved: Joi.boolean(),
    imageURL: Joi.string().required(),
  }),
};

const getServices = {
  query: Joi.object().keys({
    filter: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getServiceByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
const getServiceById = {
  params: Joi.object().keys({
    serviceId: Joi.required().custom(objectId),
  }),
};

const updateService = {
  params: Joi.object().keys({
    serviceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.objectId().required(),
      title: Joi.string().required(),
      catagory: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      rating: Joi.number(),
      approved: Joi.boolean(),
      imageURL: Joi.string(),
    })
    .min(1),
};

const deleteService = {
  params: Joi.object().keys({
    serviceId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getServiceByUserId,
  updateService,
  deleteService,
};
