
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken')
require('dotenv').config()



const handleLogin = async (req, res) => {
    try{
        const {username , password} = req.body;    
        if(!username || !password){
            return res.status(400).json({message : "username and password must be required"});
        }    
        const foundUser = await User.findOne({email: username});
        if(!foundUser){
            // user not found
            throw new AppError("User not found", 404);
        }

        //check password 
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message: "Invalid password",

            })
        }else {
            //create jwt tokens

            const accessToken = jwt.sign(
                { 
                    userInfo : {
                        username :  foundUser.email,
                        role : foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "1h"}
            );

            const refreshToken = jwt.sign(
                {  username : foundUser.email}, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : "1d"}  
            );
            // saving refresh token , 
            const updateUser = await User.updateOne(
                { email: foundUser.email },
                { $set: { refreshToken: refreshToken } },
                    { strict: false }
    
            );  
            res.cookie("jwt", refreshToken , {
                httpOnly : true,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.status(200).json({accessToken});
        }
  
   }catch(error){
     next(error);
   }

    
}

module.exports = {
    handleLogin
}