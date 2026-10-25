
const categoryCollection = require("../database/categoryCollection");
const AppError = require('../utils/AppError');

const createCategory = async (req, res) => {
  try{
    // returns rejected promise , if createCategory() fails to create due to  (schema validation error)
    const category = await categoryCollection.createCategory(req.body);
      res.status(201).json({
        success : true,
        data : category
      });

  }catch(error) {
     next(error);
  }
  
};

const getAllCategories = async (req, res) => {
  try{

    const categories = await categoryCollection.getAllCategories();
    res.status(200).json({
        success : true,
        data : categories
      });

  }catch(error){
    next(error);
  }
  
};

const getCategoryById = async (req, res) => {

  try{
    
     const category = await categoryCollection.getCategoryById(req.params.id);
     
    // if given id is valid but not exist in category collection, category become null
     if(!category){
        throw new AppError("Category not found", 404);
     }

     res.status(200).json({
      success: true,
      data : category
     })

  }catch(error){
    next(error);
  }
 
};

const updateCategory = async (req, res) => {

  try{
      const category = await categoryCollection.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
          throw new AppError("Category not found", 404);
      }

      res.status(200).json({
        success : true,
        data : category
      });

  }catch (error) {
     next(error);
  }
};

const deleteCategory = async (req, res) => {
  try{
     const category = await categoryCollection.deleteCategory(req.params.id);
      if (!category) {
         throw new AppError("Category not found", 404);
      }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category
    });
    
  }catch(error){
     next(error);
  }
}
  
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};