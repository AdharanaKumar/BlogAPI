

const express = require("express")
const router = express.Router();

const registerController = require("../controllers/registerController");

// REGISTER
router.post("/", registerController.handleRegistration);

module.exports = router;