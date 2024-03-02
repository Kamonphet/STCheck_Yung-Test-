const trportModel = require('../model/reportModel')

// create
exports.createreport = async(req, res) => {
    const {lekti_id, mission, check_name, reason, slug} = req.body
    
    await checknameModel.create({lekti_id, mission, check_name, reason, slug})
    .then((data)=>{
        res.status(201).json({message : "Data has been added"})
    }).catch((err)=>{  
        res.status(400).json({error:" เกิดข้อผิดพลาด ใส่ข้อมูลอีกครั้ง"})
    });
}

// get data form classroom
exports.getAllreport=async (req,res)=>{
    const { slug } = req.params;
    await checknameModel.find({slug})
    .then((chk)=>{
        if(!chk) return res.status(404).json({message : "Notfound!"})
        res.status(200).json(chk)
    }).catch((err)=>console.log(err))
}
