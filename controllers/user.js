const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/index");

const register = async (req, res) => {
   
      //check user email exist
      let Email = await userModel.findOne({"email": req.body.email})
      let username = await userModel.findOne({"username": req.body.username})
    
      if(Email){
        return res.status(404).json({
            message: 'Email exist already'
        })
      }else if(username){
        return res.status(404).json({
            message: 'Username exist already'
        })
      }
    
      let user = new userModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
      });
    
      const result = await user.save()
       
      res.status(201).json(result)
};

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    userModel.findOne({ "email": email }).then((user) => {
      if (user) {
        user.comparePassword(password, async function (err, result) {
          if (err) {
            res.json({
              message: err,
            });
            return;
          }
          if (result) {
              let token = jwt.sign(
                { id: user._id, type: "hunter" },
                process.env.USER_TOKEN_SECRET,
                {
                  expiresIn: process.env.TOKEN_LIFE,
                });
              res.json({
                id: user._id,
                user,
                message: "Login Successful!",
                token,
              });
            
          } else {
            res.status(403).json({ message: "Invalid Password" });
          }
        });
      } else {
        res.status(404).json({
          message: "User does not exist",
        });
      }
    });
  };

  module.exports = {
    register,
    login,
    };
    