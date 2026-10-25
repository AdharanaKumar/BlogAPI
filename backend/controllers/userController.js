
const userCollection = require("../database/userCollection");
const AppError = require('../utils/AppError');

const createUser = async (req, res) => {
   try {
    const user = await userCollection.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
     next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userCollection.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
      next(error);
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userCollection.getUserById(req.params.id);
    if (!user) {
       throw new AppError("Tag not found", 404);
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
     next(error);
  }
};

const updateUser = async (req, res) => {
   try {
    const user = await userCollection.updateUser(req.params.id, req.body);
    if (!user) {
      throw new AppError("Tag not found", 404);
    }
    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
      next(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userCollection.deleteUser(
      req.params.id
    );

    if (!user) {
      throw new AppError("Tag not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user
    });
    
  } catch (error) {
      next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};