const express =  require('express');
const router = express.Router();
const {createStudent, getAllStudent,singleStudent,updateStudent,deleteStudent} = require('../controller/studentController')



// CRUD นักเรียน
router.post('/createStudent',createStudent)
router.get('/students',getAllStudent)
router.get('/student/:_id',singleStudent)
router.delete('/student/:_id',deleteStudent)
router.put('/student/:_id',updateStudent)

module.exports=router