const express = require('express')
const router = express.Router()
const {login, register, currentUser} = require('../controller/authController')

router.post('/register',register)
router.post('/login',login)
router.post('/currentUser',currentUser)

module.exports=router