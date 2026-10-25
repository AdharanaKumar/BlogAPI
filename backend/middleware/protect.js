const mongoose = require('mongoose');
const Post = require('../models/postModel');

const canUpdatePost = async (req, res ) => {
    try{
          
        const RequestedUser = req.user.username ;
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid post ID"
        });
        }
        const post = await Post.findOne({_id: req.params.id}).populate("author" , "name email role");
        if(!post) {return res.status(404).json({message: "post not found"})}; // not required in after frontend implementation
        if(RequestedUser != post.author.email){
            return res.status(403).json({
            message: "Only the author can update this post"
        }); 
        }
        req.post = post;
        next();
  } catch (error) {
    // next(error);
    
    res.status(500).json({message : error.message});
  }
}

const canDeletePost = async (req, res) => {
    try{
        const RequestedUser = req.user.username ;
        const post = await Post.findOne({Id: req.params.id}).populate("author" , "name email role");
        if(!post) {return res.status(404).json({message: "post not found"})}; // not required in after frontend implementation
        if(req.user.username != post.author.email && req.user.role != "admin"){
            return res.status(403).json({
            message: "Only the author or admin  can delete this post"
        }); 
        }
        req.post = post;
        next();
    }catch(error) {
        // next(error);
          res.sendStatus(500);
    }
}

const isAdmin = async (req, res) => {

    try{
        if(req.user.role != "admin"){
            return res.status(403).json({
            message: "Only  admin  can add or delete this resource"
        }); 
        }  
        next();

    }catch(error) {
        // next(error);
          res.status(500).json({message : error.message});
    }
}


module.exports = {canUpdatePost, canDeletePost, isAdmin}