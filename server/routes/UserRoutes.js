const { createToken } = require("../middleware/jwtMiddleware");
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

router.post("/register", registerUser, createToken);  // Register first, then create token
router.post("/login", loginUser, createToken);        // Login first, then create token

module.exports = router;
