require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const slidesByTcode = require('./slidesByTcode.js');
const updateSlidesByTcode = require('./updateSlidesByTcode.js');
// const slidesByTcode = require('./slidesByTcode.js');
const backEndRouter = express.Router();
const {fbise9math} = require('./q_manager/questionSchema/QuestionSchema.js');
const Teacher = require("../models/teacher.js");
/////////////////////////////////////////////////
//////////////////////////////////
// backEndRouter.use((req, res, next) => {
//   // debugger;
//   if (req.path === '/teacher_login') {
//     // Skip verification for the /teacher_login route
//     next();
//   } else {
//     const user = verify(req);
//     if (user) {
//       req.user = user;
//           if(user.status === "admin"){
//             req.isAdmin = true; //very important
//           }else {
//             req.isAdmin = false; //very important
//           }
//       next();
//     } else {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }
//   }
// });


///////////////////////////////////////////////////////////////////////

backEndRouter.get("/fbise_math9th_syllabus", async function (req, res) {
   try {
  //  debugger;
 const questions = await fbise9math.find({}).select({
      classNo: 1,
      chapter: 1,
      board: 1,
      exercise:1,
      questionNo:1,
      part:1,
      name:1,
      questionType: 1,
      status: 1,
      filename: 1,
      filledBy:1
    });

      return res.status(200).json({ questions, message: "success",ok:true  });

  } catch (error) {
    console.error(error);
     return res.status(500).json({ ok:false, message: "failed to load syllabus" });
    // return res.status(500).json({ message: 'Unknown error!' });
  }
});

////////////////////////////////////////////////////////
backEndRouter.post("/update" , async function(req,res) {
  try {
  debugger;
  const presentation = req.body.presentation;
  const id  = presentation._id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
   const tf  = await updateSlidesByTcode(tcode,presentation,id);
      if (tf   ){
        return res.status(200).json({ message: 'success' });
      }else {
        return res.status(404).json({ message: "failed to save" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
backEndRouter.post("/read" , async function(req,res) {
  try {
  debugger;
  const id  = req.body.id;
  const tcode  = req.body.tcode;
  if (!id || !tcode) {return  res.status(400).json({ message: "missing data" }); }
  
  //  const {slides,item}  = await slidesByTcode(tcode,id);
   const item  = await fbise9math.findById(id).lean();
      if (item !== null   ){
        return res.status(200).json({item});
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
////////////////////////////////////////////////////////
backEndRouter.post("/teacher_login", async function (req, res) {
  try {
  // debugger;
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
module.exports = backEndRouter;
////////////////////////////////////////////////////////

function extractEmailPrefix(email) {
    let atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        return email.substring(0, atIndex);
    } else {
        return 'name not found';
    }
}

function verify(req) {
 try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return res.status(403).json({ msg: "A token is required for authentication" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user to request object
    return decoded.user;
  } catch (error) {
    return false;
  }
}

function verifyAdmin(req) {
 try {
  //  debugger;
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return false;
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if ( decodedUser.user.status !== "admin" ){
      return false;
    }else {
      return decodedUser.user;
    }
  ///////////////////////  
  } catch (error) {
    return false;
  }
}




