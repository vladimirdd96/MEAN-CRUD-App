const mongoose = require("mongoose");
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
            junior: "junior",
            mid: "mid",
            senior: "senior",
        },
    },
    _officeId: {
        type: Schema.Types.ObjectId,
        ref: "Offices",
        required: false,
    },
    img: {
        type: Schema.Types.ObjectId,
        ref: "Gallery",
        required: false,
    },
});

const Employee = mongoose.model("Employee", EmployeeScheema);

module.exports = Employee;