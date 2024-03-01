const mongoose = require('mongoose')

const checkNameSchema = mongoose.Schema({
    lekti: Number,
    mission : String,
    check_ma : String,
    check_kad : String,
    check_la : String,
    check_masai : String,
    reason: String,
    slug:{
        type: String,
        lowercase:true
    }
},{timestamps:true})

module.exports = mongoose.model('checkName',checkNameSchema)