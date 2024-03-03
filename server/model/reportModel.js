const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
    r_username: String,
    r_type: String,
    r_dtail: String,
    r_file: String
},{timestamps:true})

module.exports = mongoose.model('report',reportSchema)