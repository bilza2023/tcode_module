
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const nonAuthRouter = express.Router();

const {MathQuestion} = require("../models/mathQuestion.js");
const {FBISE9th} = require("../models/mathQuestion.js");
const Teacher = require("../models/teacher.js");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
nonAuthRouter.post("/add_question" , async function(req,res) {
  try {
  debugger;
  const question  = req.body.question;
  const admin = verifyAdmin(req);

  if (!admin){
     return res.status(500).json({ message: "Not Authorised" });
  }else {
  await FBISE9th.create(question);
     return res.status(200).json({ message: "Question Added" });
  }
  
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
/////////////////////////////////////////////////
nonAuthRouter.get("/get_question" , async function(req,res) {
  try {
  // debugger;
  const quizId  = req.query.id;
  
    const mathQuestion = await FBISE9th.findById( quizId );
      if (mathQuestion == null){
        return res.status(404).json({ msg: "Item not found" });
      }      
      return res.status(200).json({ mathQuestion, msg: "success" });

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
nonAuthRouter.post("/upload_math" , async function(req,res) {
try{
    debugger;
    const question = req.body.question;
    const options = { new: false, upsert: false }; 
    await FBISE9th.findByIdAndUpdate( question._id , question,options);

    return res.status(200).json({status : "ok"});
            // console.log(subscribers);
}catch(error){
        return res.status(400).json({status : "error" , msg:"failed to save question"   });
}
});
////////////////////////////////////////////////////////
nonAuthRouter.post("/backup", async function (req, res) {
  try {
   const admin = verifyAdmin(req);

  if (!admin){
     return res.status(500).json({ message: "Not Authorised" });
  }
    const questions = await FBISE9th.find({ });
    const total_questions = await FBISE9th.countDocuments();
    return res.status(200).json({ questions,total_questions, message: "success" });

  } catch (error) {
    // console.error(error);
    return res.status(500).json({ msg: 'Unknown error!' });
  }
});
nonAuthRouter.get("/math_fbise", async function (req, res) {
  try {
    // debugger;
    const questions = await FBISE9th.find({ filledBy: { $in: [null, ""] } });
    const total_questions = await FBISE9th.countDocuments();
    return res.status(200).json({ questions,total_questions, message: "success" });

  } catch (error) {
    // console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
  }
});

nonAuthRouter.post("/all_filled", async function (req, res) {
  try {
    const questions = await FBISE9th.find({ filledBy: { $nin: [null, ""] } });
    return res.status(200).json({ questions, message: "success" });

  } catch (error) {
    return res.status(500).json({ message: 'Unknown error!' });
  }
});

nonAuthRouter.get("/math_syllabus/:status", async function (req, res) {
  try {
    // debugger;
    const statusIncomming  = req.params.status;
    
    const questions = await FBISE9th.find({ status : statusIncomming });

    return res.status(200).json({ questions, message: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
  }
});
nonAuthRouter.post("/filledByMe", async function (req, res) {
  try {
    debugger;
    const teacher_name  = req.body.teacher_name;
    //--check login token later
    const token  = req.body.token;
    
    const questions = await FBISE9th.find({ filledBy : teacher_name });

    return res.status(200).json({ questions, msg: "success" });

  } catch (error) {
    // console.error(error);
    return res.status(500).json({ msg: 'Unknown error!' });
  }
});
nonAuthRouter.get("/getex", async function (req, res) {
  try {
    const boardParam = req.query.board;
    const exerciseParam = req.query.exercise;

    if (!boardParam || !exerciseParam) {
      return res.status(400).json({ msg: "Board and exercise parameters are required" });
    }

    const mathQuestions = await MathQuestion.find({ board: boardParam, exercise: exerciseParam });

    if (mathQuestions.length === 0) {
      return res.status(404).json({ msg: "No matching math questions found" });
    }

    return res.status(200).json({ mathQuestions, msg: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unknown error!' });
  }
});
nonAuthRouter.get("/get_chapter", async function (req, res) {
  try {
    const chapter = req.query.chapter;
    const questions = await MathQuestion.find({  chapter });

    return res.status(200).json({ questions, message: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unknown error!' });
  }
});
////////////////////////////////////////////////////////
//http://localhost/mathboard?board=FBISE
nonAuthRouter.get("/mathboard", async function (req, res) {
  try {
    const boardParam = req.query.board;
    // const exerciseParam = req.query.exercise;

    if (!boardParam) {
      return res.status(400).json({ msg: "Board parameter is required" });
    }

    const mathQuestions = await MathQuestion.find({ board: boardParam });

    if (mathQuestions.length === 0) {
      return res.status(404).json({ msg: "No matching math questions found" });
    }

    return res.status(200).json({ mathQuestions, msg: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unknown error!' });
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
      return res.status(400).json({ msg: "Email and password are required" });
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
nonAuthRouter.post("/delete_question", async function (req, res) {
  try {
  debugger;
  const questionId  = req.body.id;
  const admin = verifyAdmin(req);

  if (!admin){
     return res.status(500).json({ message: "Not Authorised" });
  }
  //////////////////////////////////// 
  const mathQuestion = await FBISE9th.findById( questionId );
      if (mathQuestion == null){
     return res.status(404).json({ message: "Item not found" });
      } else {
        if (!mathQuestion.eqs || mathQuestion.eqs.length > 0){
          return res.status(500).json({ message: "Question has content" });
        }else {
          await FBISE9th.findByIdAndRemove(questionId);
          return res.status(200).json({ message: "Question Deleted" });
        }
      }     

  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});

////////////////////////////////////////////////////////
module.exports = nonAuthRouter;


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




