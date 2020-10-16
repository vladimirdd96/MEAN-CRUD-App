const express = require('express');

const CompanyController = require('../controllers/company-controller');

const companyRouter = express.Router();


//Search
// companyRouter.get('/', CompanyController.findByName)

//Company
companyRouter.get('/company', CompanyController.findAll)

// companyRouter.get('/company/:companyId/offices', CompanyController.findById)

// companyRouter.get('/company/search', CompanyController.findByName)

companyRouter.post('/company', CompanyController.create)

companyRouter.patch('/company/:companyId', CompanyController.update)

companyRouter.delete('/company/:companyId', CompanyController.delete)

module.exports = companyRouter;