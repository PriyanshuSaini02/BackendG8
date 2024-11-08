const express = require("express");
const router = express.Router();

const { registerDoctor } = require("../controllers/doctorDetailController");
const { createToken } = require("../middleware/jwtMiddleware");

router.post("/register", registerDoctor, createToken); // createToken is applied after successful registration

// You could define other routes here, for example:
// router.get("/protected-route", validateJwtToken, someProtectedControllerFunction);

module.exports = router;
