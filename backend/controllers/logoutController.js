

const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const handleLogout = async  (req, res) => {

    try{
        const cookies = req.cookies;
        if(!cookies?.jwt)  return res.sendStatus(401);   // unauthorised , refreshToken not yet issued     
        const ReceivedrefreshToken = cookies.jwt;
        const foundUser = await User.findOne({refreshToken : ReceivedrefreshToken});
        if(!foundUser)  {
            // delete cookie
                res.clearCookie("jwt" , {httpOnly : true}); 
                throw new AppError("User not found", 404);
        }  

        // delete cookie in the database
        const updateUser = await User.updateOne({refreshToken : ReceivedrefreshToken}, {$unset : { refreshToken : ""}});
        console.log("updated User");
        res.clearCookie("jwt" , {httpOnly : true}).status(403).json({message: "logout successfully"});
    }catch(error){
        next(error);
    }
    
}

module.exports =   { handleLogout }
   
