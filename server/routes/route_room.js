const express = require('express')
const router = express.Router()
const {create,getAllroom,singleRoom,deleteRoom,updateRoom} = require('../controller/roomController')

// middleware
const {auth} = require('../middleware/authMiddle')

// CRUD ห้องเรียน
router.post('/createRoom',create)
router.get('/rooms',auth ,getAllroom)
router.get('/room/:slug',singleRoom)
router.delete('/room/:slug',auth ,deleteRoom)
router.put('/room/:slug',updateRoom)



module.exports=router