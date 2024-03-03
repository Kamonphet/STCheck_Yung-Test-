const jwt = require( 'jsonwebtoken' );
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs')

exports.login= async (req,res)=>{
    try{
        // check user
        const {email, password} = req.body;
        let  user = await userModel.findOneAndUpdate({ email }, {new: true});
        // console.log(user);

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(401).send({msg:"รหัสผ่านไม่ตรงกันนะ!"})
            }

            // payload
            let payload ={
                user:{
                    name: user.fname + ' '+ user.lname,
                    id : user._id,
                    email: user.email,
                    role: user.role
                }
            }
            // gen token
            jwt.sign(payload , process.env.JWT_SECRET , {expiresIn: "2h"},(err, token)=>{
                if(err) throw err;
                return res.json( {token, payload})
            })
            
        } else {
            return res.status(401).send({msg:'ไม่มีผู้ใช้งานนี้นะ!'})
        }

    }catch (err){
        console.log('ลงทะเบียนผู้ใช้งานไม่สำเร็จ: ', err);
        res.status(500).send('Server error');
    }
    
}

exports.register= async (req,res)=>{
    try{
        // check user in DB
        const {fname, lname, email, password} = req.body
        let user = await userModel.findOne({email})
        
        if(user){
            return res.status(400).send({msg:"ผู้ใช้งานนี้ถูกใช้งานแล้ว"})
        }

        // Encrypt
        const source = await bcrypt.genSalt(10)
        user = new userModel({
            fname,
            lname,
            email,
            password
        })
        user.password = await bcrypt.hash(password,source)

        // save
        await user.save()
        res.send('ลงทะเบียนผู้ใช้งานสำเร็จ!')

    }catch (err){
        console.log('ลงทะเบียนผู้ใช้งานไม่สำเร็จ: ', err);
        res.status(500).send('Server error');
    }
}

exports.currentUser =async(req,res)=>{
    try{
        // console.log("Current User is : ", req.user);
        const user = await userModel.findOne({email:req.user.email}).select('-password').exec()
        res.send(user)
    }catch{
        res.status(500).json({message:'server error'});
    }
}

exports.authlogin = async(req,res,next)=>{
    try{
        const token = req.headers['token']
        if(!token) {
            return res.status(401).send({ auth: false, message: 'ไม่มี Token นะ' });
        }
        jwt.verify(token, process.env.JWT_SECRET ,function(err, decoded) {
          if (err) { return res.status(500).send({ auth: false, message: 'ยืนยัน Token ล้มเหลว.' });}  
          
          // if everything good, save to request for use in other routes
            req.user=decoded;
            
            next();// move to the next middleware function  
        }); 
    } catch(ex) {
      // return json response with an error message along with status code
         return res.status(403).send({auth:false, message: 'ยืนยัน Token ล้มเหลว.'})
    }
}