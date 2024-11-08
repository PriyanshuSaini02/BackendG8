const jwt = require('jsonwebtoken');//initialize jsonwebtoken 

//after successful register of user calling the login endpoint with the already registered user,it will create and return JWT token
const createToken= (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:400000});
}

// after loginUser, we are getting the token and for validating in jwt token,that it is correct or not,we will proceed with secure routes,to get/post/update/delete
const validateJwtToken=(req,res,next)=>{
    //we are checking that token is avaiable or not in request handlers
    const tokenCheck=req.headers.authorization;
    //option 1: req handler token,authorization not sent,(doesn't exists)
    if(!tokenCheck){
        return res.status(401).json({err:'Token not avaiable'});
    }

    //option 2:req header getting token: but not in a right format:
    //Authorization: BASIC / BEARER
    //BASIC btoa(USERNAME:PASSWORD)->BASIC hjwieduweifjhvd [BASE64]
    //BEARER fdjfhuejrenfdierjdf
    const token=req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({err:"Invalid Token"});
    }
    try {
        const validateToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=validateToken;
        next();
    } catch (err) {
        return res.status(401).json(err.message);
    }
}

module.exports={createToken,validateJwtToken};