// for CRUD
// connect DB & operation DB
const slugify = require('slugify')
const roomModel = require('../model/roomModel')
const {v4: uuidv4} = require('uuid')

// save data
exports.create = async (req,res)=>{
    const {classroom, subject, profile} = req.body
    // let slug = uuidv4()
    let slug = slugify(classroom+' '+subject)

    // valid
    switch(true){
        case !classroom: 
            return res.status(400).json({error:'Class field is required'})
            break;
        case !subject:
            return res.status(400).json({error:"Subject field is required"})
            break;
    }   

    // insert into DB
    roomModel.create({classroom, subject, profile, slug}).then((result) => {
        console.log('Data inserted', result)
        res.status(201).json({message : "ข้อมูลห้องเรียนถูกเพิ่มแล้ว" ,
        id : result._id })
    }).catch((err) => {
        res.status(400).json({error:" เกิดข้อผิดพลาด มีข้อมูลซ้ำ"})        
    });

}

 // get all data from DB
 exports.getAllroom = async (req, res) => {
    try {
        const room = await roomModel.find({});
        res.json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ดึงข้อมูลห้องเรียนไม่ได้!' });
    }
}

// exports.getAllroombyid = async (req, res) => {
//     try {
//         const room = await roomModel.findOne({id});
//         res.json(room);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching blogs' });
//     }
// }

// ดึงข้อมูลที่สนใจอ้างอิงตาม slug
exports.singleRoom=async (req,res)=>{
    const { slug } = req.params;
    await roomModel.findOne({slug})
    .then((room)=>{
        if(!room) return res.status(404).json({message : "หาห้องเรียนไม่เจออะ!"})
        res.status(200).json(room)
    }).catch((err)=>console.log(err))
}

// delete db form slug
exports.deleteRoom=async (req,res)=>{
    const { slug } = req.params;
    await roomModel.findOneAndDelete({slug})
    .then(()=>{
        res.status(200).json({message : "ลบข้อมูลห้องเรียนสำเร็จ!"})
    }).catch((err)=>{
        res.status(400).json({message : "ลบข้อมูลห้องเรียนไม่สำเร็จ!"})
    })
}

exports.updateRoom = async (req, res) => {
    const { slug } = req.params;
    const {classroom, subject, profile} = req.body
    roomModel.findOneAndUpdate({slug},{classroom ,subject ,profile},{new:true})
    .then((room)=>{
        res.send('Updated')
        // res.status(200).json(room)
    }).catch((err)=>{   
        console.log(err)
        res.status(500).json({message:"อัพเดตห้องเรียนล้มเหลว"})
    })
}

// exports.getSubject = async (req,res) => {
//     try {
//         const room = await roomModel.find({});
//         res.json(room);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error fetching blogs' });
//     }
// }