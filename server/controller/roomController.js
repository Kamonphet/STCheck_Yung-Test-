// for CRUD
// connect DB & operation DB
const slugify = require('slugify')
const roomModel = require('../model/roomModel')

// save data
exports.create = async =(req,res)=>{
    const {classroom, subject, profile} = req.body
    const slug = slugify(classroom+' '+subject)


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
        res.status(201).json({message : "Data has been added" ,
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
        res.status(500).json({ message: 'Error fetching blogs' });
    }
}
