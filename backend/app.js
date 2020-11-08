const express = require("express");
const app = express();
const mongoose = require("./database/mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

app.use(express.json());

const companyRouter = require("./database/routes/company-router");
const officeRouter = require("./database/routes/office-router");
const employeeRouter = require("./database/routes/employee-router");
const searchRouter = require("./database/routes/search-router");
const galleryRouter = require("./database/routes/gallery-routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1800");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  // res.header("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
  next();
});

//Company

app.use(companyRouter);

//Office

app.use(officeRouter);

//Employee

app.use(employeeRouter);

//Search

app.use(searchRouter);

//Image

app.use("/company/:companyId/offices/:officeId/new-employee", galleryRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
