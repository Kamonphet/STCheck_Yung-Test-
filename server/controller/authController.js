const jwt = require( 'jsonwebtoken' );
const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs')

exports.login= async (req,res)=>{
    try{
        // check user
        const {email, password} = req.body;
        let  user = await userModel.findOneAndUpdate({ email }, {new: true});
        console.log(user);

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(401).send({msg:"Invalid Password"})
            }

            // payload
            let payload ={
                user:{
                    name: user.fname + ' '+ user.lname,
                    id : user._id,
                    email: user.email
                }
            }
            // gen token
            jwt.sign(payload.user , process.env.JWT_SECRET , {expiresIn: "2h"},(err, token)=>{
                if(err) throw err;
                res.json( {token, payload})
            })
            
        } else {
            return res.status(404).send('User Not Found!')
        }

    }catch (err){
        console.log('Error in registering user: ', err);
        res.status(500).send('Server error');
    }
    
}

exports.register= async (req,res)=>{
    try{
        // check user in DB
        const {fname, lname, email, password} = req.body
        let user = await userModel.findOne({email})
        
        if(user){
            return res.status(400).send("User already exists")
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
        res.send('Registered Successfully!')

    }catch (err){
        console.log('Error in registering user: ', err);
        res.status(500).send('Server error');
    }
}