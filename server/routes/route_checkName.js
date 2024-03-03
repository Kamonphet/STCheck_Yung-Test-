const express =  require('express');
const router = express.Router();
const {createCheckName, getChecknameformClassroom} = require('../controller/checkNameController')
const {authlogin} = require('../controller/authController')

// CRUD เช็คชื่อ
router.post('/createCheckname',authlogin,createCheckName)
router.get('/checknames/:slug',authlogin,getChecknameformClassroom)

module.exports=router