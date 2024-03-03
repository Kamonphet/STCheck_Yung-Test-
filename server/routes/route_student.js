const express =  require('express');
const router = express.Router();
const {createStudent, getAllStudent,singleStudent,updateStudent,deleteStudent, getStudentformclassroom} = require('../controller/studentController')
const {authlogin} = require('../controller/authController')


// CRUD นักเรียน
router.post('/createStudent',authlogin,createStudent)
router.get('/students',authlogin,getAllStudent)
router.get('/student/:_id',authlogin,singleStudent)
router.get('/students/:slug',authlogin,getStudentformclassroom)
router.delete('/student/:_id',authlogin,deleteStudent)
router.put('/student/:_id',authlogin,updateStudent)

module.exports=router