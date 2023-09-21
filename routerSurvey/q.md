am creating a node.js mongodb mongoose express app.

I have a collection in my mongodb database called "tests" and another collection called "surveys".
Both of these collections are created the same mongoose schema. It means that the data format of both the collection is exectly the same.

please write me a function which recieves (req,res) with an incomming "Test" object that will be written to "surveys" collection as a new document.

Here is an  example of the function to start with:
require('dotenv').config();
const {Survey,Test} = require("../models/survey/survey.js");
const respOk = require("../common/respOk.js");
const respFail = require("../common/respFail.js");

async function save(res,incommingTest){
  try {

    if(survey){
      return res.status(200).json({ msg : "Survey Saved",survey });
    }else {
      return res.status(404).json({ msg : "Item not found" });
    }
  } catch (error) {
      return res.status(500).json({ msg : "failed to save" });
    // const r = await respFail(res,"failed to save","failedToSaveSurvey");
    return r;
  }
}


module.exports = save;

Here is the SurveySchema ::
const mongoose = require('mongoose');

const {memberSchema} = require('./member');
const {svyQuestionSchema} = require("./svyQuestion");


//--user id & 1 question
const SurveySchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    // default : ""
  },
  userId: {
    type: String,
    required: true
  },
  saveResponse: {
    type: Boolean,
    default : true,
    required: false
  },
  showIntro: {
    type: Boolean,
    default : true,
    required: false
  },
  introText: {
    type: String,
    default : "Welcome",
    required: false
  },
  published: {
    type: Boolean,
    required: true,
    default : false
  },
  showResult: {
    type: Boolean,
    default : true,
    required: false
  },
  showfarewellText: {
    type: Boolean,
    default : true,
    required: false
  },
  farewellText: {
    type: String,
    default : "Goodbye",
    required: false
  },
   createdAt: {
    type: Date,
    default: Date.now
  }, 
   members: {
    type: [memberSchema],
    required: false,
    default : []
  },
  questions: {
    type: [svyQuestionSchema],
    required: false,
    default : []
  }
});

////////////////////////////////////////////////////////
const Survey = mongoose.model('Survey', SurveySchema,  'surveys');
const Template = mongoose.model('Template', SurveySchema);
const Test = mongoose.model('Test', SurveySchema);

module.exports = {Survey , Template , Test} ;


