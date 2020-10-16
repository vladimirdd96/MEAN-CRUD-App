const mongoose = require('mongoose')
require('dotenv').config()

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB!"))
    .catch(err => console.log(err))

module.exports = mongoose