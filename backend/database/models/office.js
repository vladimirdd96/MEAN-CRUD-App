const mongoose = require('mongoose');
const Employee = require('./employee')
const Company = require('./company')

const Schema = mongoose.Schema;

const OfficesSchema = new Schema({
    countryName: String,
    cityName: String,
    streetName: String,
    streetNumber: String,
    _companyId: {
        type: Schema.Types.ObjectId,
        required: false
    },
    ifHeadquarters: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Offices = mongoose.model('Offices', OfficesSchema)

module.exports = Offices;