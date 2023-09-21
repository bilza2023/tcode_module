require('dotenv').config();
const  {db,User} = require('../dbSqlite/dbSqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"message":"success"});
try{
console.log("reached");
const email = req.body.email;
const password = req.body.password;
//--
if (email === undefined){
return res.status(404).json({ "message" : "email is missing."  });
}
if (password === undefined){
return res.status(404).json({ "message" : "password is missing."  });
}
//--
if (isValidEmail(email) === false) {
return res.status(404).json({ "message" : "email is not in correct format."  });
}
//--
if (isValidPassword(password) === false) {
return res.status(400).json({ "message" : "password is not valid."  });
}
//--
const isUnique = await isEmailUnique(email);
    if (isUnique==false) {
    return res.status(400).json({"message" : "Email is already taken."});
    }
//--
const hasedPassword = await bcrypt.hash(password, 2);

  const userObj  = {email,password:hasedPassword};
  await User.create(userObj);

 return res.status(201).redirect("/loginform");

}//try end

  catch(err){
    return res.status(400).json({  "message" : "failed to singup :" + err });
  }

}
////////////////////////////////////////////////////
//-- This is the end
const isEmailUnique = async  (email)=> {

const user  = await User.findOne({where: { email }});
// console.log(user);

  if (user==null) {
        return true;
  } else {
  // console.log("exists");
    return false;
  }
}

const isValidPassword =(password)=> {
    if(/\s/.test(password)) {
      return { status: false, message: "Password must not contain any whitespace characters" }
    }
    if(password.length < 6) {
      return { status: false, message: "Password must be at least 6 characters long" }
    }
    return { status: true, message: "Password is valid" }
}

//--to remove every thing from a table
// db.User.destroy({
//   where: {},
//   truncate: true
// })