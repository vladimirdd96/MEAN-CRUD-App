const express = require('express')
const app = express()
const mongoose = require('./database/mongoose')
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

app.use(express.json())

const CompanyController = require('./database/controllers/CompanyController')
const OfficeController = require('./database/controllers/OfficeController')
const EmployeeController = require('./database/controllers/EmployeeController')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, HEAD, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    next()
})

//Company

app.get('/company', CompanyController.findAll)

app.get('/company/search', CompanyController.findByName)

app.post('/company', CompanyController.create)

app.patch('/company/:companyId', CompanyController.update)

app.delete('/company/:companyId', CompanyController.delete)

//Office

app.get('/company/:companyId/offices', OfficeController.findAll)

app.get('/company/:companyId/offices/search', OfficeController.findByCountryCityStreet)

app.post('/company/:companyId/offices', OfficeController.create)

app.patch('/company/:companyId/offices/:officeId', OfficeController.update)

app.delete('/company/:companyId/offices/:officeId', OfficeController.delete)

//Employee

app.get('/company/:companyId/offices/:officeId/employees', EmployeeController.findAll)

app.get('/company/:companyId/offices/:officeId/employees/search', EmployeeController.findByFnLn)

app.post('/company/:companyId/offices/:officeId/employees', EmployeeController.create)

app.patch('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.update)

app.delete('/company/:companyId/offices/:officeId/employees/:employeeId', EmployeeController.delete)


app.listen(3000, () => console.log("Listening on port 3000"))