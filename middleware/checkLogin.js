require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
const jwt = require('jsonwebtoken');
const Subscriber = require("../models/subscriber.js");

 async  function  checkLogin(token) {
// const token = req.body.token;
    
    if(token == null || token == ""){
      return  {user:null , isLogin :false};
    }
// verify token with JWT_SECRET
const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from decoded token
    const userId = decoded.id;
    // find user by id
    const user = await Subscriber.findById(userId);
    return  {user , isLogin :true};
}

module.expoerts = checkLogin;