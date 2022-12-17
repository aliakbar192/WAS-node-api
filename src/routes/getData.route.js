const express = require("express");
const validate = require("../middlewares/validate");
const { AdminData } = require("../controllers");

const router = express.Router();

router.route("/").get(AdminData.getData);
router.route("/:userId").get(AdminData.getEmpData);
module.exports = router;
