require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const backEndRouter = express.Router();
const MathFullObj = require('../mathFull/MathFullObj.js');
const Teacher = require("../models/teacher.js");
/////////////////////////////////////////////////
//////////////////////////////////
backEndRouter.use((req, res, next) => {
  // debugger;
  if (req.path === '/teacher_login') {
    // Skip verification for the /teacher_login route
    next();
  } else {
    const user = verify(req);
    if (user) {
      req.user = user;
          if(user.status === "admin"){
            req.isAdmin = true; //very important
          }else {
            req.isAdmin = false; //very important
          }
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  }
});
// backEndRouter.post("/add_special_question" , async function(req,res) {
//   try {
//  debugger;
//   const question  = req.body.question;
//   const result = await MathFullObj.CreateQSpecial(question.questionType,question.board,question.classNo,question.chapter,question.name);
//       if (result.ok){
//         return res.status(200).json({message : 'Question added'  });
//       }  else {
//         return res.status(500).json({message : 'failed to add'  });
//       }

//   } catch(error) {
//     return res.status(400).json({msg : 'unknown error!'  });
//   }
// });
// backEndRouter.post("/add_reg_question" , async function(req,res) {
//   try {
//  debugger;
//   const question  = req.body.question;
//   const result = await MathFullObj.CreateQReg(question.questionType,question.board,question.classNo,question.chapter,question.exercise,question.questionNo,question.part);
//       if (result.ok){
//         return res.status(200).json({message : 'Question added'  });
//       }  else {
//         return res.status(500).json({message : 'failed to add'  });
//       }

//   } catch(error) {
//     return res.status(400).json({msg : 'unknown error!'  });
//   }
// });
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
// backEndRouter.post("/delete_question" , async function(req,res) {
//   try {
//  debugger;    
//   const id  = req.body.id;
//   const result = await MathFullObj.Delete(id)
//       if (result.ok){
//         return res.status(200).json({message : 'question deleted'  });
//       }  else {
//         return res.status(500).json({message : 'failed to delete'  });
//       }

//   } catch(error) {
//     return res.status(400).json({msg : 'unknown error!'  });
//   }
// });
///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//-does not need isAdmin field
backEndRouter.post("/update" , async function(req,res) {
try{
    debugger;
    const question = req.body.question;
      if (!question.filledBy || question.filledBy == "" || question.filledBy == undefined){
        question.filledBy = req.user.email;
      }
    const r = await MathFullObj.Update(question);
      if (r.ok){
      return res.status(200).json({ ok:true });
      }else {
      return res.status(500).json({ ok:false, message:"failed to update" });
      }

  }catch(error){
        return res.status(400).json({status : "error" , msg:"failed to save question"   });
  }
});
/////////////////////////////////////////////////
backEndRouter.post("/filled_by_me" , async function(req,res) {
  try {
  debugger;
  // const teacher_name  = req.body.teacher_name;
  const filledBy = req.user.email;
  const questions = await MathFullObj.Where( {filledBy} );
      if (questions !== null   ){
        return res.status(200).json({ questions:questions.questions, message: "success" });
      } else {
        return res.status(404).json({ message: "None found" });
      }                  
  } catch(error) {
        return res.status(400).json({ message : 'unknown error!' });
  }
});
/////////////////////////////////////////////////
backEndRouter.get("/get_question" , async function(req,res) {
  try {
// debugger;
  const quizId  = req.query.id;
  const isAdmin = req.isAdmin;
    const result = await MathFullObj.Get( quizId );
      if (result.ok  ){
        return res.status(200).json({ question: result.question, message: "success",isAdmin });
      }else {
        return res.status(404).json({ message: "Not found" });
      }      
            

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
backEndRouter.get("/fbise_math9th_syllabus", async function (req, res) {
  try {
  // debugger;
    const result  = await MathFullObj.GetSyllabus();
    if (result.ok){
      return res.status(200).json({ questions :result.questions, message: "success",ok:true  });
    }else {
      return res.status(500).json({ ok:false, message: "failed to load syllabus" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
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




