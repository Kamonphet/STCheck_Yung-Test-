const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    lekti: Number,
    fname: String,
    lname: String,
    classroom: {
        type:String,
        required:true
    },
    slug:{
        type: String,
        lowercase:true
    }
},{timestamps:true})

module.exports = mongoose.model('student',studentSchema)