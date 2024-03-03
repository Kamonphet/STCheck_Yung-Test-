const express =  require('express');
const router = express.Router();
const {createReport, getAllreport} = require('../controller/reportController')

// CRUD เช็คแจ้งการใช้งาน
router.post('/createReport',createReport)
router.get('/reports',getAllreport)

module.exports=router