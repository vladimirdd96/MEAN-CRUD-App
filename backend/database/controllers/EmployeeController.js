const EmployeeModel = require('../models/employee')

const EmployeeController = {
    findAll: (req, res) => {
        console.log('finding all employees');
        EmployeeModel.find({})
            .then((employee) => { res.send(employee) })
            .catch((err) => console.log(err))
    },
    findByFnLn: (req, res) => {
        console.log('finding employee');
        EmployeeModel.find({ $or: [{ firstName: { $eq: req.body.firstName } }, { lastName: { $eq: req.body.lastName } }] })
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
    create: (req, res) => {
        console.log('creating employee');
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
        console.log('updating employee');
        EmployeeModel.findOneAndUpdate({ _id: req.params.employeeId }, { $set: req.body }, { useFindAndModify: false, returnOriginal: false })
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
    delete: (req, res) => {
        console.log('deleting employee');
        EmployeeModel.findByIdAndRemove(req.params.employeeId)
            .then(employee => res.send(employee))
            .catch(err => console.log(err))
    },
}

module.exports = EmployeeController