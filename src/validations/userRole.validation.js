const Joi = require("joi");
const { objectId, password, userName } = require("./custom.validation");
Joi.objectId = require("joi-objectid")(Joi);
const createUserRole = {
  body: Joi.object().keys({
    userId: Joi.objectId().required(),
    role: Joi.string().required(),
  }),
};

const getUserRole = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUserRole,
  getUserRole,
};
