const express = require("express");
const validate = require("../middlewares/validate");
const { serviceValidation } = require("../validations");
const { serviceController } = require("../controllers");

const router = express.Router();

router
  .route("/")
  .post(
    validate(serviceValidation.createService),
    serviceController.createService
  )
  .get(validate(serviceValidation.getServices), serviceController.getServices);

router
  .route("/:serviceId")
  .get(
    validate(serviceValidation.getServiceById),
    serviceController.getServiceById
  )
  .put(
    validate(serviceValidation.updateService),
    serviceController.updateServiceById
  )
  .delete(
    validate(serviceValidation.deleteService),
    serviceController.deleteService
  );

module.exports = router;
