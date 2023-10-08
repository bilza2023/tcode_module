require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const nonAuthRouter = express.Router();
const {MathFull} = require("../models/mathFull.js");
const Question = require('../questions/Questions.js');
const Teacher = require("../models/teacher.js");
/////////////////////////////////////////////////
nonAuthRouter.post("/add_special_question" , async function(req,res) {
  try {
 debugger;
  const question  = req.body.question;
  const result = await Question.CreateQSpecial(question.questionType,question.board,question.class,question.chapter,question.name);
      if (result.ok){
        return res.status(200).json({message : 'question added'  });
      }  else {
        return res.status(500).json({message : 'failed to add'  });
      }

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
nonAuthRouter.post("/add_reg_question" , async function(req,res) {
  try {
 debugger;
  const question  = req.body.question;
  const result = await Question.CreateQReg(question.questionType,question.board,question.class,question.chapter,question.exercise,question.questionNo,question.part);
      if (result.ok){
        return res.status(200).json({message : 'question added'  });
      }  else {
        return res.status(500).json({message : 'failed to add'  });
      }

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
nonAuthRouter.post("/delete_question" , async function(req,res) {
  try {
 debugger;    
  const id  = req.body.id;
  const result = await Question.Delete(id)
      if (result.ok){
        return res.status(200).json({message : 'question deleted'  });
      }  else {
        return res.status(500).json({message : 'failed to delete'  });
      }

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
nonAuthRouter.post("/update" , async function(req,res) {
try{
    
    const question = req.body.question;
    // const eqs = req.body.eqs;
      // debugger;
      const options = { new: false, upsert: false };
      // await Eqs.findByIdAndUpdate(question.ref, {eqs}, options);
      await MathFull.findByIdAndUpdate(question._id, question, options);
      return res.status(200).json({ status: "ok" });

}catch(error){
        return res.status(400).json({status : "error" , msg:"failed to save question"   });
}
});
/////////////////////////////////////////////////
nonAuthRouter.get("/get_question" , async function(req,res) {
  try {
// debugger;
  const quizId  = req.query.id;
  
    // const question = await MathFull.findById( quizId ).lean();
    const question = await MathFull.findById( quizId );
      if (question !== null   ){
        return res.status(200).json({ question, message: "success" });
      }else {
        return res.status(404).json({ message: "Not found" });
      }      
            

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
nonAuthRouter.get("/fbise_math9th_syllabus", async function (req, res) {
  try {
    const questions = await MathFull.find();

    return res.status(200).json({ questions, message: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
  }
});

////////////////////////////////////////////////////////
nonAuthRouter.post("/teacher_login", async function (req, res) {
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
    return res.status(200).json({ msg: "Login successful", token: token ,status,teacher_name});
    } else {
      return res.status(401).json({  msg: "Invalid email or password" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({  msg: "Login failed", error });
  }
});
////////////////////////////////////////////////////////
module.exports = nonAuthRouter;
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
    return { user: decoded.user };
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




