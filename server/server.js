const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const route_room = require('./routes/route_room')
const route_auth = require( './routes/route_auth' )
const route_student = require('./routes/route_student');

require('dotenv').config()

// const router = express.Router()
const app = express()


// connect database local
// mongodb//hostname:port/dbname
const dburl = 'mongodb://localhost:27017/STcheck_yung'
mongoose.connect(dburl,{
    useNewUrlParser :true ,useUnifiedTopology:true
}).then(()=>console.log('connect successful'))
.catch(err=>console.log(err))

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// route
// จาก route หลักที่กำหนดในไฟล์ server -> route ย่อยใน folder route -> เมื่อผู้ใช้ get route ย่อยนั้น ๆ จะเข้าไปที่ controller เพื่อควบคุมการประมวลผลหลักของเว็บและติดต่อกับ DB
// app.get('/',(req,res)=>{
//     res.status(200) //แจ้่ง status code
//     res.type('text/html')
//     res.send('Hello world')
// })

app.use('/api',route_room)
app.use('/api',route_auth)
app.use('/api',route_student)

//connect sever
const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`start server in port ${port}`))