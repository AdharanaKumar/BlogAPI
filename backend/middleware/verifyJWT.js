
require('dotenv').config();
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // authorization = "Bearer accessToken"
    if(!authHeader)  return res.status(401).json({message : "Not authorised"})
    const token =    authHeader.split(" ")[1];
    //  res.status(400).json("Read successfully")
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ,
         (err, decoded) => {
            if(err) {  return res.status(403).json({message : err.message}) }
               
            req.user = decoded.userInfo;
            next();
         })
}

module.exports = verifyJWT;
