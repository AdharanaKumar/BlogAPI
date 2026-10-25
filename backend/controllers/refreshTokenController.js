
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const AppError = require('../utils/AppError');

const handleRefreshToken = async  (req, res) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.jwt)  return res.sendStatus(401);   // unauthorised , refreshToken not yet issued     
        const ReceivedrefreshToken = cookies.jwt;
        const foundUser = await User.findOne({refreshToken : ReceivedrefreshToken});
        if(!foundUser) {
             throw new AppError("User not found, invalid refreshToken", 403);
        }
        // evaluate refreshToken 
        jwt.verify(ReceivedrefreshToken, process.env.REFRESH_TOKEN_SECRET , 
            (err, decoded) => {
            
                if(err || foundUser.email != decoded.username) return  res.sendStatus(403);
                // create new access token and send
                const accessToken = jwt.sign(
                    { 
                        userInfo : {
                            username : foundUser.email,
                            role : foundUser.role
                        }
                    }, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "30s"});

                res.status(201).json({accessToken});
            }
        )
   } catch(error){
      next(error);
   }
    
}

module.exports =   { handleRefreshToken };
   
