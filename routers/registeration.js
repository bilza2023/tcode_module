require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const addQuestion = require('./addQuestion.js');
const getModel = require('./getModel.js');
const registeration = express.Router();
const Student = require("../models/student.js");
const sendGmail = require("../gmail.js");
const { v4: uuid } = require('uuid');
////////////////////////////////////////////////////////
registeration.post("/teacher_login", async function (req, res) {
  try {
  debugger;
    const email = req.body.email;
    const passwordPlain = req.body.password;
    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // if there is no status in the table it will return "teacher" as per the default in the Schema
    const user = await Teacher.findOne({ email });
    // console.log("user", user);
    if (user == null) {
      return res.status(404).json({ msg: "Email address not found" });
    }

    if (await bcrypt.compare(passwordPlain, user.password)) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const status = user.status;
    // const teacher_name = extractEmailPrefix(email);
    const teacher_name = email ;

    res.set("Authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "Login successful", token: token ,status,teacher_name});
    } else {
      return res.status(401).json({  msg: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({  msg: "Login failed", error });
  }
});
////////////////////////////////////////////////////////
registeration.post("/signup", async function (req, res) {
  try {
    const email = req.body.email;
    const passwordPlain = req.body.password;
    // Input validation
    if (!email || !passwordPlain) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Student.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "This Email already exists" });
    }
    // debugger;
    const verificationId = uuid();
    const hashedPassword = await bcrypt.hash(passwordPlain, 2);
    const data = {email, password: hashedPassword, status: 'free',verificationId }

    const newuser = await Student.create(data);
    if(newuser){
      await sendGmail(email,verificationId);
      return res.status(200).json({  message: "your account has been created" });
    } else {
      return res.status(500).json({  message: "signup failed"});
    }
  } catch (error) {
    return res.status(500).json({  message: "signup failed", error });
  }
});

////////////////////////////////////////////////////////
registeration.get("/verify", async function (req, res) {
  try {
    debugger;
    const id = req.query.id;
    const email = req.query.email;
    const user = await Student.findOne({ email:email , verificationId:id });
    if (!user) {
      return res.status(404).json({ message: "This link is not valid" });
    }else {
    user.verified = true;
    user.verificationId = '';
     const options = { new: false, upsert: false };
     const tf  = await Student.findByIdAndUpdate(user._id,user, options);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to verify" });
      }
    }

  } catch (error) {
    return res.status(500).json({  message: "failed to verify", error });
  }
});
////////////////////////////////////////////////////////
module.exports = registeration;
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
