
const categoryCollection = require("../database/categoryCollection");

const createCategory = async (req, res) => {
  try{
    // returns rejected promise , if createCategory() fails to create due to  (schema validation error)
    const category = await categoryCollection.createCategory(req.body);
      res.status(201).json({
        success : true,
        data : category
      });

  }catch(error) {
    res.json({
      success : false,
      message: "Failed to create Category",
      error : error.message
    })
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
    
    res.status(500).json({
        success : false,
        message: "Failed to fetch categories",
        error : error.message
    })
  }
  

 
};

const getCategoryById = async (req, res) => {

  try{
    
     const category = await categoryCollection.getCategoryById(req.params.id);
     
    // if given id is valid but not exist in category collection, category become null
     if(!category){
   
       return res.status(404).json({
        success: false,
        message: "Category not found"
      });
     }

     res.status(200).json({
      success: true,
      data : category
     })

  }catch(error){
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error : error.message
    })
  }
 

};

const updateCategory = async (req, res) => {

  try{
      const category = await categoryCollection.updateCategory(
      req.params.id,
      req.body
      );
      if (!category) {
            return res.status(404).json({
              success: false,
              message: "Category not found"
            });
        }

      res.status(200).json({
        success : true,
        data : category
      });

  }catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message
    });

  }

};

const deleteCategory = async (req, res) => {
  try{
     const category = await categoryCollection.deleteCategory(req.params.id);

      if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category
    });
    
  }catch(error){

    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message
    });
  }

  }
  
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};