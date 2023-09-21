
const {SkillzaaErrors} = require('./SkillzaaErrors');
const skillzaErrList = new SkillzaaErrors();

/////////////////////////////////////////////////////////////////// 
skillzaErrList.addErr("testError",500,"This is a test error");
skillzaErrList.addErr("oneResultPerStudent",500,"Only one result per test is allowed");
skillzaErrList.addErr("hasResults",500,"The item has associated results can not be deleted");
/////////////////////////////////////////////////////////////////// 
skillzaErrList.addErr("loginError",400,"You may not be logged in");
skillzaErrList.addErr("testHasResponses",400,"This test has responses and can not be deleted");
skillzaErrList.addErr("failedToUpdate",500,"Failed to Update");
skillzaErrList.addErr("QuestionTypeModelError",500,"Some of the question types do not have a valid database model");
skillzaErrList.addErr("maxItemLimitExceeded",500,"You have reached the maximum limit for creating this item");
skillzaErrList.addErr("failedToCreateNew",500,"Failed to create new item");
skillzaErrList.addErr("deleteError",500,"Failed to delete");
skillzaErrList.addErr("itemNotFound",404,"Sorry the item was not found");
skillzaErrList.addErr("unknownError",500,"Unknown error");
skillzaErrList.addErr("corruptIncommingData",400,"The incomming data is corrupted");

////////////////////////////////////////////////////////
module.exports = skillzaErrList;
