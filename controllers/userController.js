const  {db,User} = require('../database/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = db.users;
const Projects = db.projects;
const isValidEmail = require('./util/isValidEmail.js');

//-----------------------------------
////////////////////////////////////////////////
const addNewUser = async (req, res ) => {
try{
const email = req.body.email;
const password = req.body.password;
//--
if (isValidEmail(email) === false) {
return res.status(404).json({ "error" : "email is not in correct format"  });
}
//--
if (isValidPassword(password) === false) {
return res.status(404).json({ "error" : "password is not valid"  });
}
//--
const isUnique = await isEmailUnique(email);
    if (isUnique==false) {
    return res.status(400).json({message : "Email is already taken"});
    }
//--

  bcrypt.hash(password, 10, async function(err, hasedPassword) {
      if (err) {
         return  res.status(404).json({  message : "failed hash operation" });
      }else {
      const userObj  = {email,password:hasedPassword};
        await User.create(userObj);

        const accessToken = jwt.sign(userObj,process.env.JWT_TOKEN);

        return res.status(201).json({  accessToken , email, password,hasedPassword });
      }
    });
  }
  catch(err){
    return res.status(404).json({  message : "failed to singup :" + err });
  }

}
////////////////////////////////////////////////
const addUser = async (req, res ) => {
const body = req.body;
const name = body.name;
const email = body.email;

const user = await User.create({name,email});
res.status(201).json({user});
}
////////////////////////////////////////////////
const deleteUser = async (req, res ) => {
const id = req.body.id;
// console.log(id);

User.destroy({
  where: {
    id: id
  }
}).then(function() {
res.status(200).json({message:"success"});
  // The user with an id of 123 has been deleted
})
.catch(function(err) {
res.status(404).json({message: err.message});
});

}
////////////////////////////////////////////////
////////////////////////////////////////////////
const updateUser = async (req, res ) => {
const id = req.body.id;
const name = req.body.name;
const email = req.body.email;
// console.log(id);

User.update(
  { name , email },
  { where: { id } }
).then(function() {

res.status(200).json({message:"success"});
  // The user with an id of 123 has been deleted
})
.catch(function(err) {
res.status(404).json({message: err.message});
});

}
////////////////////////////////////////////////
const getAllUsers = async (req, res) => {

    const users = await User.findAll({});

    res.status(200).send(users);

}
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

const isValidPassword =  (password)=> {
if (password.length >= 8) {return true;} else {return false;}
}

module.exports = {
addUser,
getAllUsers,
deleteUser,
updateUser,
addNewUser,
isEmailUnique
}


//--to remove every thing from a table
// db.User.destroy({
//   where: {},
//   truncate: true
// })