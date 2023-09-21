const uuid = require('uuid');
// import { v4 as uuid } from 'uuid';


const getDataBaseMCQ = ()=>{
    return {
    id : uuid(),
    required : false,
    content : "",
    explanation : "",
    multiSelect: false,
    selectedOptions :[],
    correctOptions :[],
    displayOptions : 'bars',
    questionType : 'SurveyMCQ',
    options :[]
    };
}

const getDataMCQ = ()=>{
const correctId = uuid();
    return {
    id : uuid(),
    required : false,
    content : "Question Statement",
    explanation : "",
    multiSelect: false,
    selectedOptions :[],
    correctOptions :[correctId],
    displayOptions : 'bars',
    questionType : 'SurveyMCQ',
    options :[
    {id : correctId , content : "Option One"},
    {id : uuid() , content : "Option Two"}
    ]
    };
}

const getDataEmail = ()=>{
    return {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyEmail',
    payload  :      ""
    };
}

const getDataInput = ()=>{
    return {
    id : uuid(),
    required : false,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyInput',
    payload  :      ''
    };
}

const getDataNumber = ()=>{
    return {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyNumber',
    payload  :      0
    };
}

const getDataParagraph = ()=>{
    return {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyParagraph',
    payload  :      ''
    };
}

const getDataPassword = ()=>{
    return {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyPassword',
    payload  :      ''
    };
}

const getDataUrl = ()=>{
    return {
    id : uuid(),
    required : true,
    content :       'Question Statement',
    explanation :   '',
    questionType : 'SurveyUrl',
    payload  :      ''
    };
}

function getSurvey(user_id, incomming_title = "New Test") {
   const svy = { 
        userId : user_id,
        title : incomming_title,
        saveResponse : false,
        showIntro : true,
        introText : "Welcome",
        published : false,
        showResult : true,
        showfarewellText : true,
        farewellText : "Goodbye",
        publishObj : {
            publishTechnique:'now' , 
            unpublishTechnique : 'never',
            hour:9, 
            min: 30, 
            unpublishHour:1,
            unpublishMin :0,
            publishDate:null
            },
        members : [],
        questions : []
   }
 return svy;   
}

function getMcqWOption(opt=[]){
    // debugger;
    const newMCQ = getDataBaseMCQ();
    for (let i = 0; i < opt.length; i++) {
        const newOption =  {};
        newOption.id = uuid();
        newOption.content = opt[i];
        newMCQ.options.push(newOption);
    }
return newMCQ;
}
module.exports = { getDataUrl,getDataPassword,getDataParagraph,getDataNumber,getDataInput,getDataEmail,getDataMCQ,getDataBaseMCQ, getMcqWOption, getSurvey }

// export { getDataUrl,getDataPassword,getDataParagraph,getDataNumber,getDataInput,getDataEmail,getDataMCQ,getDataBaseMCQ, getMcqWOption, getSurvey }
