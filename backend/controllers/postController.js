
// controlls the operations(CRUD) related to posts collection

const postCollection = require("../database/postCollection")

const createPost = async (req,res) => {
     try {
        const post = await postCollection.createPost(req.body);

        res.status(201).json({
            success: true,
            data: post
      });

  } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
     });
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

        res.status(500).json({
            success: false,
            message : "Failed to fetch posts",
            error: error.message
        });
    }
};

const getPostById = async (req,res) => {
    try{
        const post = await postCollection.getPostById(req.params.id);

        if(!post){

            return res.status(404).json({
                success: false,
                message: "Post not found",

            })
        }
         res.status(200).json({
            success: true,
            data: post
        });
    } catch (error){
           res.status(500).json({
                success : false,
                message: "Failed to fetch post",
                error : error.message
           }) 
    }
    
};

// Update Post
const updatePost = async (req,res) => {
   try{
        const post = await postCollection.updatePost(req.params.id,req.body);
            
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
   }catch(error){
    
       res.status(error.statusCode || 500).json({
            success: false,
            message : error.message
       });
   }
    
};

//Delete Post
const deletePost = async (req,res) => {
    try{
        const post = await postCollection.deletePost(req.params.id);

         if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: post
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete post",
            error: error.message
        });
  }

};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};


//author id : 6ab8afb4a2cfb0ebc5fb76a4
// 