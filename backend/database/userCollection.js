
const User = require("../models/userModel");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    { returnDocument: "after", runValidators: true}
  );
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};