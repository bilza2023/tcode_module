const {Test,Survey} = require("../models/survey/survey");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");



async function run(req, res){
    try {
  debugger;
    const id = req.body.id;
    const userId = req.user._id;
    const title = req.body.title;


    const originalQuiz = await Test.findById(id);
    if (!originalQuiz) {
      return res.status(404).json({ msg: "Test not found" });
    }
    //--Store the Test id into testId since Survey/Running will be deleted.
    originalQuiz.testId = originalQuiz._id.toString(); 

    const survey = new Survey(originalQuiz.toObject());
    // userId is already set
    survey._id = undefined;
    survey.published = true; //important
    //--why was fol line  here?
    // survey.members = [{email : "aaa@msn.com" , password : "12345"}]; //important
    survey.isNew = true;
    survey.title = title; //--new title
    survey.createdAt = Date.now();
    await survey.save();
    return respOk(res,"Test Running..",{ survey ,msg: "Test Running.." })
  
  } catch (error) {

    return respFail(res,500,"unknownError","unknown error",);
  }


}

module.exports = run;