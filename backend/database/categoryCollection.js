
const Category = require("../models/categoryModel");

const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const updateCategory = async (categoryId, updateData) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    updateData,
    { returnDocument: "after", runValidators: true}
  );
};

const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};