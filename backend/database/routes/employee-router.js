const express = require('express');

const EmployeeController = require('../controllers/employee-controller');

const employeeRouter = express.Router();


//Search
// employeeRouter.get('/employees', EmployeeController.findByFnLn)

//Employee
employeeRouter.get('/company/:companyId/offices/:officeId/employees', EmployeeController.findAll)

// employeeRouter.get('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.findById)

// employeeRouter.get('/company/:companyId/offices/:officeId/employees/search', EmployeeController.findByFnLn)

employeeRouter.post('/company/:companyId/offices/:officeId/employees', EmployeeController.create)

employeeRouter.patch('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.update)

employeeRouter.delete('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.delete)

// employeeRouter.get('/company/search', await Promise.all([ CompanyController.findByName(), OfficeController.findByCountryCityStreet(), EmployeeController.findByFnLn()]))

module.exports = employeeRouter;