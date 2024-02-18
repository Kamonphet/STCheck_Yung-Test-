const express = require('express')
const router = express.Router()
const {create,getAllroom,singleRoom,deleteRoom} = require('../controller/roomController')

router.post('/createRoom',create)

router.get('/rooms',getAllroom)

router.get('/room/:slug',singleRoom)

router.delete('/room/:slug',deleteRoom)

module.exports=router