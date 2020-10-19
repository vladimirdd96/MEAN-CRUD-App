const express = require("express");

const CompanyController = require("../controllers/company-controller");
const OfficeController = require("../controllers/office-controller");
const EmployeeController = require("../controllers/employee-controller");
const SearchController = require("../controllers/search-controller");

const searchRouter = express.Router();

// searchRouter.get('/', CompanyController.findAll)
searchRouter.get("/company", CompanyController.findAll);
searchRouter.get("/offices", OfficeController.findAll);
searchRouter.get("/employees", EmployeeController.findAll);

module.exports = searchRouter;
