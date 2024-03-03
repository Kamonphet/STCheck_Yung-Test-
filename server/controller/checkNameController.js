const checknameModel = require('../model/checkNameModel')

// create
exports.createCheckName = async(req, res) => {
    const {lekti_id, mission, check_name, reason, slug} = req.body
    
    await checknameModel.create({lekti_id, mission, check_name, reason, slug})
    .then((data)=>{
        res.status(201).json({message : "ข้อมูลการเช็คชื่อถูกเพิ่มแล้ว"})
    }).catch((err)=>{  
        res.status(400).json({error:" เกิดข้อผิดพลาด ใส่ข้อมูลอีกครั้ง"})
    });
}

// get data form classroom
exports.getChecknameformClassroom=async (req,res)=>{
    const { slug } = req.params;
    await checknameModel.find({slug})
    .then((chk)=>{
        if(!chk) return res.status(404).json({message : "หาข้อมูลการเช็คชื่อไม่เจอ!"})
        res.status(200).json(chk)
    }).catch((err)=>console.log(err))
}

// exports.getChecknameformClassroom=async (req,res)=>{
//     const { slug } = req.params;
//     await checknameModel.aggregate([
//         {
//             $lookup:{
//                 from: "students",
//                 localField: "lekti_id",
//                 foreignField: "_id",
//                 as: "student_data_ckeck"
//             },
//         },
//         {
//             $unwind:"$student_data_ckeck"

//         },
//         {
//             $match: {
//               "student_data_check.slug": {slug},
//             },
//         },
//         {
//             $project:{
//                 "student_data_ckeck._id":1,
//                 "student_data_ckeck.fname":1,
//                 "student_data_ckeck.lname":1,
//                 "student_data_ckeck.createAt":1,
//                 "student_data_ckeck.mission":1,
//                 "student_data_ckeck.check_name":1,
//                 "student_data_ckeck.reason":1,
//                 "student_data_ckeck.slug":1,
//             },
//         },
//     ])
//     .then((result)=>{
//        console.log("result===>", result);
//       let data={};
//       if(result[0]!==undefined){
//           data["status"]="200";
//           data["massage"]="Successfully Data Fatch";
//           data["data"]=result;
          
//       }else{
//           data["status"]="404";
//           data["massage"]="Data Not Found";
//       }
//          res.json(data) 
//     })
//     .catch((err)=>console.log(err))
// }