const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { 
        type: String, 
        unique: true 
    },
    password: {
        type:String,
        unique: true
    },
    role:{
        type : String ,
        default : "user"
    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema)