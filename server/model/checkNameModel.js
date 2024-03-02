const mongoose = require('mongoose')

const checkNameSchema = mongoose.Schema({
    lekti_id: String,
    mission : String,
    check_name : String,
    reason: {
        type: String,
        default: "-"
    },
    slug:{
        type: String,
        lowercase:true
    }
},{timestamps:true})

module.exports = mongoose.model('checkName',checkNameSchema)