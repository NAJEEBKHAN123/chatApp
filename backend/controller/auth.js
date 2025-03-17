const mongoose = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req, res) =>{
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password){
          return res.status(400).json({
            success: false,
            message: "All fields are required:"
          })
        }
      const exitingUser = await User.findOne({email});
      if(exitingUser){
       return res.status(409).json({
            success: false,
            message: "User already exits"
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const createUser = new User({
        username,
        email,
        password: hashedPassword
      });
      await createUser.save();
      return res.status(201).json({ success: true, message: "User registered successfully", data: createUser });


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

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'} )

        return res.status(200).json({success: true, message: "Login successful",
          token: token,
          user: {
            id: user._id,
            username: user.username
          }
        })
    } catch (error) {
      console.error("Error in user login:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
}


module.exports = {signup, login}