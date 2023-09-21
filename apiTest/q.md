I am running this node.js function
I am running this node.js function
const { Template } = require("../models/survey/survey.js");
const { SurveyMCQ } = require("../models/survey/svyQuestion.js");
const uuid = require('../common/uuid.js');

async function addQuestionsToQuiz(templateId, questions) {
  try {
    // Find the template using the templateId
    const template = await Template.findById(templateId);

    await addIdsToAOO(questions);
    await addIdsToOptions(questions);
    await addCorrectOptions(questions);

    const castedQuestions = await castQuestions(questions);
    // Set the template.questions to the provided questions
    template.questions = castedQuestions;

    // Save the template
    await template.save();

    console.log("Questions added to the Template");
  } catch (error) {
    console.error(error);
  }
}

module.exports = addQuestionsToQuiz;

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
async function addIdsToAOO(aoo){
    for (let i = 0; i < aoo.length; i++) {
        const e = aoo[i];
        e.id = uuid();
    }

}
async function castQuestions(questions){
const castedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
            const q = new SurveyMCQ( questions[i]  );
            castedQuestions.push( q );
    }
return castedQuestions;
}

async function addCorrectOptions(questions){
    for (let i = 0; i < questions.length; i++) {
        
        const question = questions[i];
            question.correctOptions = [];
            question.questionType = 'SurveyMCQ';
        
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            if (option.correct === true){
                question.correctOptions.push(option.id);6
            }
        }
    }
}
async function addIdsToOptions(aoo){
    for (let i = 0; i < aoo.length; i++) {
        const e = aoo[i];
        if(e.options.length > 0) {
            addIdsToAOO(e.options)
            // console.log(e.options);    
        }
    }
}



here is the svyQuestion model ==>

const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };
 
//--This is schema for a base question for a survey
const svyQuestionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  content: {
    type: String,
    required: false
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
    enum: [ 'SurveyMCQ' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
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
    required: false
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

here is survey model ==>
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
  marks: {  //Marks per question
    type: Number,
    required: true,
    default : 10
  },
  questions: {
    type: [svyQuestionSchema],
    required: false,
    default : []
  }
});

////////////////////////////////////////////////////////
const SurveySchemaExtended = new mongoose.Schema({
  testId: {
    type: String,
    required: false,
    default: ''
  }
});

SurveySchemaExtended.add(SurveySchema);

const Survey = mongoose.model('Survey', SurveySchemaExtended, 'surveys');
// const Survey = mongoose.model('Survey', SurveySchema,  'surveys');
const Template = mongoose.model('Template', SurveySchema);
const Test = mongoose.model('Test', SurveySchema);

module.exports = {Survey , Template , Test} ;

the questions saved in mongodb are missing question.content why ?



here is the svyQuestion model ==>

const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };
 
//--This is schema for a base question for a survey
const svyQuestionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  content: {
    type: String,
    required: false
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
    enum: [ 'SurveyMCQ' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
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
    required: false
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

here is survey model ==>
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
  marks: {  //Marks per question
    type: Number,
    required: true,
    default : 10
  },
  questions: {
    type: [svyQuestionSchema],
    required: false,
    default : []
  }
});

////////////////////////////////////////////////////////
const SurveySchemaExtended = new mongoose.Schema({
  testId: {
    type: String,
    required: false,
    default: ''
  }
});

SurveySchemaExtended.add(SurveySchema);

const Survey = mongoose.model('Survey', SurveySchemaExtended, 'surveys');
// const Survey = mongoose.model('Survey', SurveySchema,  'surveys');
const Template = mongoose.model('Template', SurveySchema);
const Test = mongoose.model('Test', SurveySchema);

module.exports = {Survey , Template , Test} ;

the questions saved in mongodb are missing question.content why ?