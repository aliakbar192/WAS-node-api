const express = require("express");

const docsRoute = require("./doc.route");
const testRoute = require("./test.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const serviceRoutes = require("./service.route");
const orderRoutes = require("./order.route");
const getDataRoutes = require("./getData.route");
const router = express.Router();

router.use("/documentation", docsRoute);
router.use("/test", testRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/service", serviceRoutes);
router.use("/order", orderRoutes);
router.use("/getdata", getDataRoutes);
module.exports = router;
