
// define all the database functions related to post Collection

const mongoose = require('mongoose')

const Post = require("../models/postModel")
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Tag = require('../models/tagModel')


const createPost = async (postData)=>{

    // validate all requirements will meet or not
    
    //check User ID format
    if(!mongoose.Types.ObjectId.isValid(postData.author)){
        const error = new Error("Invalid user ID")
        error.statusCode = 400; // bad request
        throw error;
    }

    //Check User exists
    const user = await User.findById(postData.author);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404; 
        throw error;
    }
    

    // Check Category ID format
    if (!mongoose.Types.ObjectId.isValid(postData.category)) {
        const error = new Error("Invalid category ID");
        error.statusCode = 400;
        throw error;
    }

    // Check Category exists
    const category = await Category.findById(postData.category);

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    if(postData.tags && postData.tags.length > 0){

        //check every tag ID format
        for(const tagId of postData.tags){

            if (!mongoose.Types.ObjectId.isValid(tagId)) {
                const error = new Error(`Invalid tag ID ${tagId}`);
                error.statusCode = 400;
                throw error;
            }
        }

        //Check all tags exist
        const tags = await Tag.find({
            _id : { $in : postData.tags}
        });

        if(tags.length !== postData.tags.length){
            const error = new Error("One or more tags not found");
            error.statusCode = 404;
            throw error;
        }
    }

    // all requirements met , now create post
    return await Post.create(postData);
};

const getAllPosts = async () => {
    return await Post.find();
}

const getPostById = async(postId) => {
    return await Post.findById(postId);
}

const updatePost = async(postId, updateData) => {
    return await Post.findByIdAndUpdate(
        postId , updateData,
         {returnDocument: "after", runValidators: true})
}

const deletePost = async(postId) => {
    return await Post.findByIdAndDelete(postId);
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};