const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1:27017/companymanager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB!"))
    .catch(err => console.log(err))

module.exports = mongoose