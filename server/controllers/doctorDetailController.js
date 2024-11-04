const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Doctor = require("../models/doctorDetailModel");
require("dotenv").config();

const registerDoctor = asyncHandler(async (req, res) => {
    const { name,
        email,
        speciality,
        phoneNumber,
        experience,
        address } = req.body;


    if (!name ||!email ||!speciality ||!phoneNumber ||!experience||!address) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        return res.status(400).json({ message: "Doctor already exists" });
    }

    const doctor = await Doctor.create({
        name,
        email,
        speciality,
        phoneNumber,
        experience,
        address
    });

    res.status(201).json({ message: "Doctor registered successfully", doctor })
});

module.exports = {
    registerDoctor
}