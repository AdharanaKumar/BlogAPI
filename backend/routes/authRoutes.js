
const express = require("express")
const router = express.Router();

const authController = require("../controllers/authController");

// REGISTER

router.post("/", authController.handleLogin);

module.exports = router;