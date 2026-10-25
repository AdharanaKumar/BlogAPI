
// controlls the operations(CRUD) related to posts collection

const postCollection = require("../database/postCollection")
const AppError = require('../utils/AppError');
const createPost = async (req,res) => {
     try {
        const post = await postCollection.createPost(req.body);

        res.status(201).json({
            success: true,
            data: post
      });

    }catch (error) {
        next(error);
    }
};

const getAllPosts = async (req,res) => {
    try{ 
         const posts = await postCollection.getAllPosts();
         res.status(200).json({
             success: true,
            data: posts
        });
    } catch(error){
        next(error);
    }
};

const getPostById = async (req,res) => {
    try{
        const post = await postCollection.getPostById(req.params.id);

        if(!post){
            throw new AppError("Post not found", 404);
        }
         res.status(200).json({
            success: true,
            data: post
        });
    } catch (error){
        next(error);
    }
    
};

// Update Post
const updatePost = async (req,res) => {
   try{
        const post = await postCollection.updatePost(req.params.id,req.body);
            
        if (!post) {
            throw new AppError("Post not found", 404);
        }

        res.status(200).json({
            success: true,
            data: post
        });
   }catch(error){
     next(error);
   }
    
};

//Delete Post
const deletePost = async (req,res) => {
    try{
        const post = await postCollection.deletePost(req.params.id);

         if (!post) {
            throw new AppError("Post not found", 404);
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: post
        });

    } catch (error) {
        next(error);
    }

};

const getPostByAuthorId = async (req,res) => {
    try{
        const post = await postCollection.getPostByAuthorId(req.params.id);

        if(post.length == 0){
            throw new AppError("Post not found", 404);
        }
         res.status(200).json({
            success: true,
            data: post
        });
    } catch (error){
         next(error);
    }
    
};
module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByAuthorId
};
