const jwt = require( 'jsonwebtoken' );
exports.auth = async (req,res,next)=>{

    try{
            const token = req.headers["authtoken"]
            if(!token){
                return res.status(401).json({msg:"No Token Provided"})
            }

            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decode.user;
            next();

    }catch (err){
        console.log(err);
        res.send('Token invalid').status(500)
    }
}