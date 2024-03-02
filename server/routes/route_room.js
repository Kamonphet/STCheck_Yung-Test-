const express = require('express')
const router = express.Router()
const {create,getAllroom,singleRoom,deleteRoom,updateRoom,getSubject} = require('../controller/roomController')


// CRUD ห้องเรียน
router.post('/createRoom',create)
router.get('/rooms',getAllroom)
router.get('/room/:slug',singleRoom)
router.delete('/room/:slug',deleteRoom)
router.put('/room/:slug',updateRoom)
router.get('/subjects',getSubject)



module.exports=router