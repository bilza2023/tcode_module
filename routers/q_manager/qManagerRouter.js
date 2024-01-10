require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const qManagerRouter = express.Router();
const addQuestion = require('./addQuestion');
/////////////////////////////////////////////////
//////////////////////////////////
// qManagerRouter.use((req, res, next) => {
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

/////////////////////////////////////////////////
qManagerRouter.post("/delete_question" , async function(req,res) {
  try {
 debugger;    
  const id  = req.body.id;
  const result = await MathFullObj.Delete(id)
      if (result.ok){
        return res.status(200).json({message : 'question deleted'  });
      }  else {
        return res.status(500).json({message : 'failed to delete'  });
      }
      
  } catch(error) {
    return res.status(400).json({msg : 'unknown error!'  });
  }
});
/////////////////////////////////////////////////

/////////////////////////////////////////////////
qManagerRouter.post("/add_question" , async function(req,res) {
  try {
    // debugger;
   const qData  = req.body.qData;
   const result = await addQuestion(qData);
    if (result.ok  ){
      return res.status(200).json({ question: result.question, message: "success" });
    }else {
      return res.status(404).json({ message: result.message });
    }                  
  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
qManagerRouter.get("/get_question" , async function(req,res) {
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

////////////////////////////////////////////////////////
module.exports = qManagerRouter;
////////////////////////////////////////////////////////

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




