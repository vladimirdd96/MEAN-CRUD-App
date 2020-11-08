const EmployeeModel = require('../models/employee')

const EmployeeController = {
    findAllForOffice: (req, res) => {
        EmployeeModel.find({
            _officeId: req.params.officeId
        })
            .populate('_officeId')
            .then((employee) => {
                res.send(employee)
            })
            .catch((err) => console.log(err))
    },

    findAll: (req, res) => {
        EmployeeModel.find({})
            .populate('_officeId')
            .then((employee) => {
                res.send(employee)
            })
            .catch((err) => console.log(err))
    },

    findByFnLn: (req, res) => {
        EmployeeModel.find({
            $or: [{
                firstName: {
                    $eq: req.body.firstName
                }
            }, {
                lastName: {
                    $eq: req.body.lastName
                }
            }]
        })
            .populate('_officeId')
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },

    findById: (req, res) => {
        EmployeeModel.findById(
            req.params.employeeId
        )
            .populate('_officeId')
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },

    create: (req, res) => {
        const employee = new EmployeeModel({
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'startingDate': req.body.startingDate,
            'salary': req.body.salary,
            'vacationDays': req.body.vacationDays,
            'experience': req.body.experience,
            '_officeId': req.params.officeId,
        })
            .save()
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },

    update: (req, res) => {
        EmployeeModel.findOneAndUpdate({
            _id: req.params.employeeId
        }, {
            $set: req.body
        }, {
            useFindAndModify: false,
            returnOriginal: false
        })
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },

    delete: (req, res) => {
        EmployeeModel.findByIdAndRemove(req.params.employeeId)
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
}

module.exports = EmployeeController