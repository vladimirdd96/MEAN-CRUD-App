const mongoose = require('mongoose')

const CompanyScheema = new mongoose.Schema({
    name: String,
    creationDate: {
        type: String,
        default: Date.now
    }

})

const Company = mongoose.model('Company', CompanyScheema)

module.exports = Company