const OfficeModel = require('../models/office')
const EmployeeModel = require('../models/employee')

const OfficeController = {
    findAll: (req, res) => {
        console.log('getting office');
        OfficeModel.find({})
            .then((office) => { res.send(office) })
            .catch((err) => console.log(err))
    },

    findByCountryCityStreet: (req, res) => {
        OfficeModel.find({ $or: [{ countryName: { $eq: req.body.countryName } }, { cityName: { $eq: req.body.cityName } }, { streetName: { $eq: req.body.streetName } }] })
            .then(office => res.send(office))
            .catch(err => console.log(err))
    },

    create: (req, res) => {
        console.log('creating office');
        (new OfficeModel({
            'countryName': req.body.countryName,
            'cityName': req.body.cityName,
            'streetName': req.body.streetName,
            'streetNumber': req.body.streetNumber,
            '_companyId': req.params.companyId,
            'ifHeadquarters': req.body.ifHeadquarters,
        }))
            .save()
            .then(office => res.send(office))
            .catch(err => console.log(err))
    },

    update: (req, res) => {
        console.log('updating office');
        OfficeModel.findOneAndUpdate({ _id: req.params.officeId }, { $set: req.body }, { useFindAndModify: false, returnOriginal: false })
            .then(office => res.send(office))
            .catch(err => console.log(err))
    },

    delete: (req, res) => {
        console.log('deleting office')
        // const deleteEmployee = office => {
        //     EmployeeModel.deleteMany({ _officeId: office._id })
        //         .then(() => office)
        //         .catch(err => console.log(err))
        // }
        OfficeModel.findByIdAndRemove(req.params.officeId)
            .then((office) => res.send(office))
            // .then((office) => res.send(d1eleteEmployee(office)))
            .catch((err) => console.log(err))
    },
}

module.exports = OfficeController