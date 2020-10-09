const mongoose = require('mongoose')

const CompanyScheema = new mongoose.Schema({
    name: String,
    creationDate: {
        type: Date,
        default: Date.now,
        required: false
    }

})

const Company = mongoose.model('Company', CompanyScheema)

module.exports = Company