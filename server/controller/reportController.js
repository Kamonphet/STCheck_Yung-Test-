const reportModel = require('../model/reportModel')

// create
exports.createReport = async(req, res) => {
    const {r_username, r_type, r_dtail, r_file} = req.body
    
    await reportModel.create({r_username, r_type, r_dtail, r_file})
    .then((data)=>{
        res.status(201).json({message : "ข้อมูลการแจ้งเตือนถูกเพิ่มแล้ว"})
    }).catch((err)=>{  
        res.status(400).json({error:" เกิดข้อผิดพลาด ใส่ข้อมูลอีกครั้ง",err})
    });
}

// get data form classroom
exports.getAllreport=async (req,res)=>{
    const { slug } = req.params;
    await reportModel.find()
    .then((report)=>{
        if(!report) return res.status(404).json({message : "หาข้อมูลการแจ้งปัญหาไม่เจอ!"})
        res.status(200).json(report)
    }).catch((err)=>console.log(err))
}
