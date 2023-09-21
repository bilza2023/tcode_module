require('dotenv').config();
const  {db,User} = require('../dbSqlite/dbSqlite');
const jwt = require('jsonwebtoken');
const isValidEmail = require("./util/isValidEmail");
const bcrypt = require('bcrypt');

//-----------------------------------
////////////////////////////////////////////////
module.exports =  async (req, res ) => {
// return res.status(200).json({"ok" : "ok"});
try{
const accessToken = req.body.accessToken;
/////////////////////////////////////////////////////////////////////
// return res.status(200).json({accessToken});

// const authHeader = req.headers['authorization'] ;
// console.log(authHeader);
// const token = authHeader.split(' ')[1];

jwt.verify(accessToken,process.env.JWT_SECRET, (err, user)=>{

  if(err){res.status(401).json({failed:true});  }
  res.user = user;
  res.status(200).json({user,accessToken});
});


///////////////////////////////////////////////////////////////////

} catch(err){
    return res.status(404).json({  message : "failed to singin :" + err });
}

}
////////////////////////////////////////////////////
