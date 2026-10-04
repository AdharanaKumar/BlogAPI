
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')



const handleLogin = async(req, res) => {

    const {username , password} = req.body;
    
    if(!username || !password){
        return res.status(400).json({message : "username and password must be required"});
    } 
    
    const foundUser = await User.findOne({email: username});

    if(!foundUser){
        // user not found
        return res.status(400).json({
            success : false,
            message: "Invalid user",

        })
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
            {expiresIn : "30s"}
        );

        const refreshToken = jwt.sign(
             { userInfo : {
                    username : foundUser.email,
                    role : foundUser.role
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : "1d"}  
        );
         
    }

    res.status(200).json({message : "User successfully logged in"});
    
}

module.exports = {
    handleLogin
};