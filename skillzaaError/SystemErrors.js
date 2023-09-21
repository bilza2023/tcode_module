
const {SkillzaaErrors} = require('./SkillzaaErrors');
const DevErrList = new SkillzaaErrors();
 
DevErrList.addErr("loginError",400,"You may not be logged in");

////////////////////////////////////////////////////////
module.exports = DevErrList;
