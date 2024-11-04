const express = require("express");
const router = express.Router();

const {
    registerDoctor
} = require("../controllers/doctorDetailController");

router.post("/register", registerDoctor);

// router.post("/login",loginUser);

module.exports = router;