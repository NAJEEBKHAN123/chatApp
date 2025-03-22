const mongoose = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/GeneToken')
const cloudinary = require('../utils/cloudinary')

const signup = async(req, res) =>{
    const {username, email, password} = req.body;
    console.log("Received data:", req.body);

    try {
        if(!username || !email || !password){
          return res.status(400).json({
            success: false,
            message: "All fields are required:"
          })
        }
        if(password.length < 6){
          return res.status(400).json({success: false, message: "Password must be al least 6 characters"})
        }
      const exitingUser = await User.findOne({email});
      if(exitingUser){
       return res.status(409).json({
            success: false,
            message: "User already exits"
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      if(user){
        generateToken(user._id, res)
        await user.save();
      return res.status(201).json({ success: true, message: "User registered successfully", data: user });
      }else{
        res.status(400).json({message: "Invalid user data"})
      }
    
    } catch (error) {
        console.error("Error in user signup:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const login = async(req, res) =>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
          return res.status(400).json({success: false, message: "All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
          return res.status(404).json({success: false, message: "Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          return res.status(401).json({success: false, message: "Invalid email or password"})
        }

       const token = generateToken(user._id, res);

        return res.status(200).json({success: true, message: "Login successful",
          token : token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
          }
        })
    } catch (error) {
      console.error("Error in user login:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
}

const logout = async(req, res) =>{
  try {
    res.cookie('jwt', "", {maxAge: 0});
    res.status(200).json({success: true, message: "Logged out successfully"})
  } catch (error) {
    console.error("Error in logged out:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
  }

  const updatePrfile = async(req, res) =>{
    try {
      const {profilePic} = req.body;
     const userId = req.user._id;

     if(!profilePic){
      return res.status(400).json({success: false, message: "Profile pic is required"})
     }

     const uploadResponse = await cloudinary.uploader.upload(profilePic)
     const uploadedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

     res.status(200).json(uploadedUser)
    } catch (error) {
      console.error("Error in upload profilePic:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  const checkAuth = async (req, res) => {
    try {
        console.log("Authenticated User:", req.user); // Debugging log
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



module.exports = {signup, login, logout, updatePrfile, checkAuth}