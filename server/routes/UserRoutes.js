const { createToken } = require("../middleware/jwtMiddleware");
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser, createToken);
module.exports = router;
