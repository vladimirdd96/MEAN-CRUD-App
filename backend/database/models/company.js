const mongoose = require('mongoose')

const CompanyScheema = new mongoose.Schema({
    name: String,
    creationDate: Date

})

const Company = mongoose.model('Company', CompanyScheema)

module.exports = Company