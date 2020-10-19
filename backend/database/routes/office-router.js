const express = require("express");

const OfficeController = require("../controllers/office-controller");

const officeRouter = express.Router();

//Search
officeRouter.get("/offices", OfficeController.findAll);

//Office
officeRouter.get(
  "/company/:companyId/offices",
  OfficeController.findAllForCompany
);

// officeRouter.get('/company/:companyId/offices/:officeId/employees', OfficeController.findById)

// officeRouter.get('/company/search', OfficeController.findByCountryCityStreet)

officeRouter.post("/company/:companyId/offices", OfficeController.create);

officeRouter.patch(
  "/company/:companyId/offices/:officeId/employees",
  OfficeController.update
);

officeRouter.delete(
  "/company/:companyId/offices/:officeId/employees",
  OfficeController.delete
);

module.exports = officeRouter;
