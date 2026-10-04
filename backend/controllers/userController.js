
const userCollection = require("../database/userCollection");

const createUser = async (req, res) => {
   try {
    const user = await userCollection.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message
    });
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

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message
    });

  }
};


const getUserById = async (req, res) => {

  try {
    const user = await userCollection.getUserById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
   try {

    const user = await userCollection.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {

    const user = await userCollection.deleteUser(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};