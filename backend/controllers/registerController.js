const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError');

const handleRegistration = async (req, res) => {
    try{
        //access user credentials
        const {name, email, password} = req.body;

        if(!name || !email || !password ){
            throw new AppError("Name, email and password are required", 400);
        }

        //check if user already exists 
        const existUser = await User.findOne({ email });

        if(existUser){
            //duplicate user
             throw new AppError("User  already registered", 400);
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
        next(error);
     }
   
}

module.exports = {
    handleRegistration 
};