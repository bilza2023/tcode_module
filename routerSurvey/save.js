
//--Require
require('dotenv').config();
const {Survey,Test} = require("../models/survey/survey.js");


async function save(req,res){
  try {
  // debugger;
        const incomingTest = req.body.survey;
  const urseId  = req.user._id; 
      const testId = incomingTest._id
      incomingTest._id = null;  
      incomingTest.published = true;  
      incomingTest.urseId = urseId.toString();  
      // console.log("incomingTest",incomingTest);
      const survey = new Survey(incomingTest);
      survey.testId = testId;
      await survey.save();

    if(survey){
      return res.status(200).json({ msg: "Survey Saved", survey });
    }else {
      return res.status(404).json({ msg : "failed to save" });
    }
  } catch (error) {
      return res.status(500).json({ msg : "failed to save" });
  }
}


module.exports = save;

