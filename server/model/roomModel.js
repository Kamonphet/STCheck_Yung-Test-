// โครงสร้างในการจัดเก็บข้อมูล blog -> collection
// title , content, author, slug(url) = ทำให้ url ดูดีขึ้น
const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    classroom: {
        type:String,
        unique:true,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:"No picture"
    },
    slug:{
        type: String,
        lowercase:true,
        unique: true
    }
},{timestamps:true})

module.exports = mongoose.model('room',roomSchema)
