const EmployeeModel = require('../models/employee')

const EmployeeController = {
    findAll: (req, res) => {
        EmployeeModel.find({})
            .then((employee) => { res.send(employee) })
            .catch((err) => console.log(err))
    },
    findByFnLn: (req, res) => {
        EmployeeModel.find({ $or: [{ firstName: { $eq: req.body.firstName } }, { lastName: { $eq: req.body.lastName } }] })
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
    create: (req, res) => {
        (new EmployeeModel({
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'startingDate': req.body.startingDate,
            'salary': req.body.salary,
            'vacationDays': req.body.vacationDays,
            'experience': req.body.experience,
            '_officeId': req.params.officeId,
        }))
            .save()
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
    update: (req, res) => {
        EmployeeModel.findOneAndUpdate({ _id: req.params.employeeId }, { $set: req.body }, { useFindAndModify: false, returnOriginal: false })
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