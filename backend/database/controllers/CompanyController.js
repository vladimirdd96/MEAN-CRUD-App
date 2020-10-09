const CompanyModel = require('../models/company')
const OfficeModel = require('../models/office')
const EmployeesModel = require('../models/employee')

const CompanyController = {
    findAll: (req, res) => {
        console.log('finding all companies');
        CompanyModel.find({})
            .then((company) => { res.send(company) })
            .catch((err) => console.log(err))
    },

    findByName: (req, res) => {
        console.log('find by name (companie)');
        CompanyModel.find({ name: req.body.name })
            .then(company => res.send(company))
            .catch(err => console.log(err))
    },

    create: (req, res) => {
        console.log('creating all companies');
        (new CompanyModel({
            'name': req.body.name,
            'creationDate': req.body.creationDate
        }))
            .save()
            .then(company => res.send(company))
            .catch(err => console.log(err))
    },

    update: (req, res) => {
        console.log('updating all companies');
        CompanyModel.findOneAndUpdate({ _id: req.params.companyId }, { $set: req.body }, { useFindAndModify: false, returnOriginal: false })
            .then(company => res.send(company))
            .catch(err => console.log(err))
    },

    delete: (req, res) => {
        console.log('deleting all companies');
        // const deleteOffice = (company) => {
        //     OfficeModel.deleteMany({ _companyId: company._id })
        //         .then(() => company)
        //         .catch(err => console.log(err))
        // }
        // const deleteEmployees = (office) => {
        //     EmployeesModel.deleteMany({ _officeId: office._id })
        //         .then(() => office)
        //         .catch(err => console.log(err))
        // }
        CompanyModel.findByIdAndRemove(req.params.companyId)
            .then(company => res.send(company))
            // .then(company => res.send(deleteOffice(company)))
            .catch(err => console.log(err))
    },
}

module.exports = CompanyController;