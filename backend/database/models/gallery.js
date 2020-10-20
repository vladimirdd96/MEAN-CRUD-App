const mongoose = require("mongoose");

const GalleryScheema = new mongoose.Schema({
  id: String,
  imageUrl: String,
  imageTitle: String,
  imageDesc: String,
  uploaded: {
    type: Date,
    default: Date.now
  },
  _employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});

module.exports = mongoose.model("Gallery", GalleryScheema);