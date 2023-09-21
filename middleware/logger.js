const moment = require('moment');
//--middle ware

const logger = (req,res,next)=>{
console.log(": ", moment().format());
next();
};


module.exports = logger;