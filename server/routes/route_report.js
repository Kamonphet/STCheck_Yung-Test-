const express =  require('express');
const router = express.Router();
const {createreport, getAllreport} = require('../controller/reportController')
const {authlogin} = require('../controller/authController')

// CRUD เช็คแจ้งการใช้งาน
router.post('/createreports',authlogin,createreport)
router.get('/reports',authlogin,getAllreport)

module.exports=router