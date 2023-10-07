
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const nonAuthRouter = express.Router();

const {MathQuestion} = require("../models/mathQuestion.js");
const {FBISE9th} = require("../models/mathQuestion.js");
const {FBISE9th2} = require("../models/mathQuestion.js");
const {MathFull} = require("../models/mathFull.js");
const {Eqs} = require("../models/mathFullEmbededSchemas.js");
const {Grid} = require("../models/mathFullEmbededSchemas.js");
const Teacher = require("../models/teacher.js");
const deleteQ = require("../question/deleteQ.js")
const createNewQReg = require("../question/createNewQReg.js")
/////////////////////////////////////////////////
nonAuthRouter.post("/add_question" , async function(req,res) {
  try {
 debugger;
  const question  = req.body.question;
  const result = await createNewQReg(question.questionType,question.board,question.class,question.chapter,question.exercise,question.questionNo,question.part);
      if (result== true){
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
  const result = await deleteQ(id);
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
/////////////////////////////////////////////////
nonAuthRouter.get("/get_question" , async function(req,res) {
  try {
// debugger;
  const quizId  = req.query.id;
  
    // const question = await MathFull.findById( quizId ).lean();
    const question = await MathFull.findById( quizId );
      if (question !== null && question.questionType == 'eqs'  ){
          const eqs = await Eqs.findById( question.ref );
          // question.eqs = eqs;
        return res.status(200).json({ question,eqs, msg: "success" });
      }      
      if (question !== null && question.questionType == 'grid'  ){
          const grid = await Grid.findById( question.ref );
          // question.grid = grid;
        return res.status(200).json({ question,grid, msg: "success" });
      }      

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
nonAuthRouter.post("/update_eq" , async function(req,res) {
try{
    
    const question = req.body.question;
    const eqs = req.body.eqs;
      // debugger;
      const options = { new: false, upsert: false };
      await Eqs.findByIdAndUpdate(question.ref, {eqs}, options);
      await MathFull.findByIdAndUpdate(question._id, question, options);
      return res.status(200).json({ status: "ok" });

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
    const questions = await MathFull.find();
    const total_questions = await MathFull.countDocuments();
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
// nonAuthRouter.get("/del_empty", async (req, res) => {
//   try {
//     // Delete documents where "filledBy" is an empty string ("") or undefined
//     const result = await FBISE9th.deleteMany({ filledBy: { $in: [null, "", undefined] } });

//     if (result.deletedCount > 0) {
//     let message= `${result.deletedCount} documents deleted successfully`;
//       console.log(message );
//     } else {
//       // return res.status(404).json({ message: '' });
//       console.log("No matching documents found for deletion");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Unknown error occurred' });
//   }
// });

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
    
    const questions = await MathFull.find({ filledBy : teacher_name });

    return res.status(200).json({ questions, msg: "success" });

  } catch (error) {
    // console.error(error);
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




