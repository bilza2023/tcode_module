 
const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };
const ContentSchema = require('./content');

//--This is schema for a base question for a survey
const svyQuestionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  content: {
    type: ContentSchema,
    required: true
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  explanation: {
    type: String,
    required: false
  },
  marks: {
    type: Number,
    required: true,
    default : 0
  },
  questionType: {
    type: String,
    enum: [ 'mcq' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
  },
  tags : {
      type: [String],
    required: false,
    default : []
  }
});
const SurveyQuestion  = mongoose.model('SurveyQuestion', svyQuestionSchema);

///////////////////////////////////--MCQ--////////////////////////
//---Options schema for MCQ
const optionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

//..

const SurveyMCQ = SurveyQuestion.discriminator('SurveyMCQ',
  new mongoose.Schema({ 
        multiSelect: {
          type: Boolean,
          required: false,
          default : false
        },
        selectedOptions: {
          type: [String],
          required: true,
          default : []
        },
        correctOptions: {
          type: [String],
          required: true,
          default : []
        },
        displayOptions: {
          type: String,
          enum: ["dropdown", "radio", "check" , "bars"],
          required: true,
          default : "bars"
        },
        options: {
          type: [optionSchema],
          required: true
        }
  })
  , options);

///////////////////////////////////--Input --////////////////////////

const SurveyInput = SurveyQuestion.discriminator('SurveyInput',
  new mongoose.Schema({ 
        payload: {
          type: String,
          required: false,
          default: "",
        },
        minChar: {
          type: Number,
          required: false,
          default : 0
        },
        maxChar: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--Paragrapg --////////////////////////

const SurveyParagraph = SurveyQuestion.discriminator('SurveyParagraph',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        minChar: {
          type: Number,
          required: false,
          default : 0
        },
        maxChar: {
          type: Number,
          required: false,
          default : 0
        }
  })
  , options);

///////////////////////////////////--Number --////////////////////////

const SurveyNumber = SurveyQuestion.discriminator('SurveyNumber',
  new mongoose.Schema({ 
        payload: {
        type: Number,
          required: false
        },
        minVal: {
          type: Number,
          required: false,
          default : 0
        },
        maxVal: {
          type: Number,
          required: false,
          default : 0
        },
  })
  , options);

///////////////////////////////////--Url --////////////////////////

const SurveyUrl = SurveyQuestion.discriminator('SurveyUrl',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        check: {
          type: Boolean,
          required: false,
          default : true
        }
  })
  , options);

///////////////////////////////////--email --////////////////////////

const SurveyEmail = SurveyQuestion.discriminator('SurveyEmail',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        check: {
          type: Boolean,
          required: false,
          default : true
        }
  })
  , options);

///////////////////////////////////--password --////////////////////////

const SurveyPassword = SurveyQuestion.discriminator('SurveyPassword',
  new mongoose.Schema({ 
        payload: {
          type: String,
          default : "",
          required: false
        },
        check: {
          type: Boolean,
          required: false,
          default : true
        },
        minChar: {
          type: Number,
          required: false,
          default : 0
        },
        maxChar: {
          type: Number,
          required: false,
          default : 0
        }
  })
  , options);


//..Export section
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//SurveyQuestion dont export since its abstract but 
module.exports = {svyQuestionSchema,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail};

