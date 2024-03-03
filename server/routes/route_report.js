const express =  require('express');
const router = express.Router();
const {createreport, getAllreport} = require('../controller/reportController')

// CRUD เช็คแจ้งการใช้งาน
router.post('/createreports',createreport)
router.get('/reports',getAllreport)

module.exports=router