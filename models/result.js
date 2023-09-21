
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  questionId: { 
    type: String,
    required: true
  },
 totalMarks: {
    type: Number,
    required: true,
    default : 10
  },
 multiSelect: {
    type: Boolean,
    required: true,
    default : false
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  payload: {
    type: String,
    required: false,
    default : ''
  },
  selectedOptions: {
    type: [String],
    required: false,
    default : []
  },
  questionType: {
    type: String,
    enum: [ 'mcq' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
  }
});
 
//--This is schema for a base result for a survey
const resultSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  classId: { 
    type: String,
    required: true
  },
  runId: {  /// this is ._id of the run and not testId.
    type: String,
    required: true
  },
  runTitle: { 
    type: String,
    required: true
  },
  studentId: { 
    type: Number,
    required: true,
  },
  studentName: { 
    type: String,
    required: true,
  },
  userId: {  //--creator of the test id
    type: String,
    required: true
  },
  answers: {
  type: [answerSchema],
  required: true
  },
  ip: { 
    type: String,
    required: false,
    default : ''
  },
  countryCode: { 
    type: String,
    required: false,
    default : ''
  },
  
});

const Result = mongoose.model('Result', resultSchema, 'results');
module.exports = Result;
////////////////////////////////////////////

