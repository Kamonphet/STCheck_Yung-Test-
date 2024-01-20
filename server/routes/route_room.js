const express = require('express')
const router = express.Router()
const {create,getAllroom} = require('../controller/roomController')

router.post('/createRoom',create)

router.get('/rooms',getAllroom)

module.exports=router