const express = require("express");

const EmployeeController = require("../controllers/employee-controller");

const employeeRouter = express.Router();

//Search
employeeRouter.get("/employees", EmployeeController.findAll);

//Employee
employeeRouter.get(
  "/company/:companyId/offices/:officeId/employees",
  EmployeeController.findAllForOffice
);

// employeeRouter.get('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.findById)

// employeeRouter.get('/company/:companyId/offices/:officeId/employees/search', EmployeeController.findByFnLn)

employeeRouter.post(
  "/company/:companyId/offices/:officeId/employees",
  EmployeeController.create
);

employeeRouter.patch(
  "/company/:companyId/offices/:officeId/employees/:employeeId",
  EmployeeController.update
);

employeeRouter.delete(
  "/company/:companyId/offices/:officeId/employees/:employeeId",
  EmployeeController.delete
);

module.exports = employeeRouter;
