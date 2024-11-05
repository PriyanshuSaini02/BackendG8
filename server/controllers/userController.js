const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../models/userModel");
require("dotenv").config();

const registerUser =asyncHandler(async(req,res)=>{
    const{name,email,password,phoneNumber}=req.body;


    if(!name || !email || !password || !phoneNumber){
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({message : "User already exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const user=await User.create({
        name,
        email,
        phoneNumber,
        password:hashedPassword,
    });

    res.status(201).json({message:"user registered successfully",user})
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please fill all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: "password did not match" });
    }

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            Name: user.Name,
            email: user.email,
            phoneNumber: user.phoneNumber
        },
    });
});



module.exports={
    registerUser,
    loginUser
}