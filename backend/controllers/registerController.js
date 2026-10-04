const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const handleRegistration = async (req, res) => {

    try{
        //access user credentials
        const {name, email, password} = req.body;

        if(!name || !email || !password ){
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        //check if user already exists 
        const existUser = await User.findOne({ email });

        if(existUser){
            //duplicate user
            return res.status(409).json({
                success: false,
                message: "User  already registered"
             });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
            const user = await User.create({
                            name,
                            email,
                            password: hashedPassword,
                            role: "user"
                       });


             res.status(201).json({
                success : true,
                message : "User created successfully",
                data:{
                    id : user._id,
                    name: user.name,
                    email : user.email,
                    role: user.role               
                }
             })          


    }catch(error){
        // return res with "registration failed"
          res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
     }
   
}

module.exports = {
    handleRegistration 
};