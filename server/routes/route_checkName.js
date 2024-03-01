const express =  require('express');
const router = express.Router();

// CRUD เช็คชื่อ
router.post('/createStudent',createStudent)
router.get('/students',getAllStudent)
router.get('/student/:_id',singleStudent)
router.get('/students/:slug',getStudentformclassroom)
router.delete('/student/:_id',deleteStudent)
router.put('/student/:_id',updateStudent)

module.exports=router