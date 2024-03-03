const express = require('express')
const router = express.Router()
const {create,getAllroom,singleRoom,deleteRoom,updateRoom} = require('../controller/roomController')
const {authlogin} = require('../controller/authController')


// CRUD ห้องเรียน
router.post('/createRoom',create)
router.get('/rooms',authlogin,getAllroom)
router.get('/room/:slug',authlogin,singleRoom)
router.delete('/room/:slug',authlogin,deleteRoom)
router.put('/room/:slug',authlogin,updateRoom)
// router.get('/subjects',getSubject)



module.exports=router