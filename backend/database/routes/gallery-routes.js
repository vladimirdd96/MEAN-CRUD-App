const express = require("express");
const router = express.Router();
const multer = require("multer");
const Gallery = require("../models/gallery");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./database/public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  },
});

const upload = multer({
  storage: storage
});

// get data by id
router.get("/company/:companyId/offices/:officeId/employees/:employeeId", function (req, res, next) {
  Gallery.find({ _employeeId: req.params.employeeId }, function (err, gallery) {
    if (err) return next(err);
    res.json(gallery);
  });
});

// post data
router.post("/company/:companyId/offices/:officeId/employees/:employeeId/add-photo", upload.single("file"), function (req, res, next) {
  if (!req.file) {
    return res.status(500).send({
      message: "Upload file"
    });
  } else {
    req.body.imageUrl = "http://192.168.0.7:3000/images/" + req.file.filename;
    req.body.employeeId = req.params.employeeId;
    Gallery.create(req.body, function (err, gallery) {
      if (err) {
        console.log(err);
        return next(err);
      }
      gallery.save()
      res.json(gallery);
    });
  }
});

module.exports = router;