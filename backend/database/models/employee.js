const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeScheema = new Schema({
    firstName: String,
    lastName: String,
    startingDate: {
        type: Date,
        default: Date.now,
    },
    salary: Number,
    vacationDays: Number,
    experience: {
        type: {
            junior: 'junior',
            mid: 'mid',
            senior: 'senior'
        }
    },
    // img: {
    //     name: String,
    //     desc: String,
    //     img: {
    //         data: Buffer,
    //         contentType: String
    //     }
    // },
    _officeId: {
        type: Schema.Types.ObjectId,
        ref: 'Offices',
        required: false
    },
});

const Employee = mongoose.model('Employee', EmployeeScheema);

module.exports = Employee;