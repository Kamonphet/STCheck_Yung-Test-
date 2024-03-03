const express =  require('express');
const router = express.Router();
const {createCheckName, getChecknameformClassroom} = require('../controller/checkNameController')

// CRUD เช็คชื่อ
router.post('/createCheckname',createCheckName)
router.get('/checknames/:slug',getChecknameformClassroom)

module.exports=router