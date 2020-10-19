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
  img: {
    type: Schema.Types.ObjectId,
    ref: "Gallery",
    required: true,
  },
  _officeId: {
    type: Schema.Types.ObjectId,
    ref: "Offices",
    required: false,
  },
});

const Employee = mongoose.model("Employee", EmployeeScheema);

module.exports = Employee;
