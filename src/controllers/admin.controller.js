const { httpStatus, message } = require("../utils/constant");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const objectUtil = require("../utils/objectUtil");
const ApiResponse = require("../utils/ApiResponse");
const {
  userService,
  userRoleService,
} = require("../services");

// const getAdmin = catchAsync(async (req, res) => {
//   const franchises = await franchiseService.queryFranchises();
//   const dealers = await dealerService.queryDealers();
//   const customers = await customerService.queryCustomers();
//   let admin = {
//     tenants: tenants.length,
//     franchises: franchises.length,
//     dealers: dealers.length,
//     customers: customers.length,
//   };
//   res.json(new ApiResponse(httpStatus.OK, message.SUCCESS, { admin: admin }));
// });
module.exports = {
  getAdmin,
};
