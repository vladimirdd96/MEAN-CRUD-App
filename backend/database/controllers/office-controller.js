const OfficeModel = require('../models/office')

const OfficeController = {
    findAll: (req, res) => {
        OfficeModel.find()
            .populate('_companyId')
            .then((office) => res.send(office))
            .catch((err) => console.log(err))
    },

    findAllForCompany: (req, res) => {
        OfficeModel.find({ _companyId: req.params.companyId })
            .populate('_officeId')
            .then((office) => res.send(office))
            .catch((err) => console.log(err))
    },

    findByCountryCityStreet: (req, res) => {
        OfficeModel.find({ $or: [{ countryName: { $eq: req.body.countryName } }, { cityName: { $eq: req.body.cityName } }, { streetName: { $eq: req.body.streetName } }] })
            .populate('_officeId')
            .then(office => res.send(office))
            .catch(err => console.log(err))
    },

    findById: (req, res) => {
        OfficeModel.find({ _id: req.params.officeId })
            .populate('_officeId')
            .then(office => res.send(office))
            .catch(err => console.log(err))
    },

    create: (req, res) => {
        const office = new OfficeModel({
            'countryName': req.body.countryName,
            'cityName': req.body.cityName,
            'streetName': req.body.streetName,
            'streetNumber': req.body.streetNumber,
            '_companyId': req.params.companyId,
            'headquarters': req.body.headquarters,
        })
            .save()
            .then(() => res.send(office))
            .catch(err => console.log(err))
    },

    update: (req, res) => {
        OfficeModel.findOneAndUpdate({ _companyId: req.params.companyId, headquarters: true }, { $set: { headquarters: false } })
            .then(hQOffice => {
                OfficeModel.findOne({ _id: req.params.officeId })
                    .then((office) => {
                        // hQOffice.headquarters = false
                        office.headquarters = !office.headquarters
                        office.save()
                        res.send(office)
                    })
                    .catch(err => console.log(err))
            })
    },

    delete: (req, res) => {
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