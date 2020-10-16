const CompanyModel = require('../models/company')
const OfficeModel = require('../models/office')
const EmployeeModel = require('../models/employee')

const SearchController = {
    search: (req, res) => {
        if (CompanyModel.find({ name: req.params.searchInput })) {
            CompanyModel.find({ name: req.params.searchInput })
                .then(c => res.send(c))
                .catch(err => console.log(err))
        } else if (OfficeModel.find({ $or: [{ countryName: { $eq: req.body.countryName } }, { cityName: { $eq: req.body.cityName } }, { streetName: { $eq: req.body.streetName } }] })) {
            OfficeModel.find({ $or: [{ countryName: { $eq: req.body.countryName } }, { cityName: { $eq: req.body.cityName } }, { streetName: { $eq: req.body.streetName } }] })
                .then(office => res.send(office))
                .catch(err => console.log(err))
        } else if (EmployeeModel.find({ $or: [{ firstName: { $eq: req.body.firstName } }, { lastName: { $eq: req.body.lastName } }] })) {
            EmployeeModel.find({ $or: [{ firstName: { $eq: req.body.firstName } }, { lastName: { $eq: req.body.lastName } }] })
                .then(employee => res.send(employee))
                .catch(err => console.log(err))
        } else console.log('Not found item of search!');
    }
}

module.exports = SearchController