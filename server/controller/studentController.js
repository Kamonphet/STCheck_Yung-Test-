const studentModel = require('../model/studentModel')

// create student
exports.createStudent = async(req, res) => {
    const {lekti, fname, lname, classroom, slug} = req.body

    await studentModel.create({lekti, fname, lname, classroom,  slug})
    .then((data)=>{
        res.status(201).json({message : "ข้อมูลถูกเพิ่มเรียบร้อย"})
    }).catch((err)=>{  
        res.status(400).json({error:" เกิดข้อผิดพลาด ใส่ข้อมูลอีกครั้ง"})
    });
}

 // get all data from DB
 exports.getAllStudent= async (req, res) => {
    try {
        const std = await studentModel.find({});
        res.json(std);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลได้' });
    }
}

// get data form classroom
exports.getStudentformclassroom=async (req,res)=>{
    const { slug } = req.params;
    await studentModel.find({slug})
    .then((stdd)=>{
        if(!stdd) return res.status(404).json({message : "หาข้อมูลนักเรียนไม่เจออะ!"})
        res.status(200).json(stdd)
    }).catch((err)=>console.log(err))
}


// ดึงข้อมูลที่สนใจอ้างอิงตาม id
exports.singleStudent=async (req,res)=>{
    const { _id } = req.params;
    await studentModel.findOne({_id})
    .then((std)=>{
        if(!std) return res.status(404).json({message : "หาข้อมูลนักเรียนไม่เจออะ!"})
        res.status(200).json(std)
    }).catch((err)=>console.log(err))
}

exports.updateStudent = async (req, res) => {
    const { _id } = req.params;
    const {lekti, fname, lname, classroom} = req.body
    studentModel.findOneAndUpdate({_id},{lekti, fname, lname, classroom},{new:true})
    .then((std)=>{
        res.send('อัพเดตรายชื่อนักเรียนละ!')
        // res.status(200).json(room)
    }).catch((err)=>{   
        console.log(err)
        res.status(500).json({message:"อัพเดตข้อมูลนักเรียนล้มเหลว"})
    })
}

// delete db form id
exports.deleteStudent=async (req,res)=>{
    const { _id } = req.params;
    await studentModel.findOneAndDelete({_id})
    .then(()=>{
        res.status(200).json({message : "ลบรายชื่อนักเรียนเรียบร้อย!"})
    }).catch((err)=>{
        res.status(400).json({message : "ลบข้อมูลนักเรียนไม่ได้อะ!"})
    })
}