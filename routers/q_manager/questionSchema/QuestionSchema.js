const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlidesSchema = require('./slidesSchema');

///////////////////////////////////////////
const QuestionSchema = new Schema({
  board: { // Board name, can be one of the specified values
    type: String,
    enum: ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE'],
    required: true
  },
  classNo: { // Class number
    type: Number,
    required:true,
  },
  chapter:{ // Chapter number 
	type:Number ,
	required:true , 
	},

//there is no need for isSpecial just create a new exercise name is "zero or concepts or special" and add it to a chapter, since exercise named are strings. Regarding name you can give name to any of the question and if it has name show it elde show question no and part
// isSpecial:{ 
// type:Boolean ,
// required:true ,
// default:false
// },	

exercise:{ 
type:String ,
required:true ,
},
//optional means if not given = 0 so we can use name instead
questionNo:{ 
type:Number ,
required:true ,
default:0
},
//optional means if not given = 0 so we can use name instead
part:{ 
type:Number ,
required:true ,
default:0
},
//if part==0 and questionNo==0 use name, even if it is not present it should not break the code since we can print "".
name:{  //same as above
type:String ,
required:false,
default : ''
},
sortOrder:{ 
type:Number ,
required:true ,
default:0
},
questionType:{ 
	type: String ,
enum: ['paid', 'login' , 'free'],
required: true,
default : 'paid'
},

status:{
	type: String ,
	required:true ,
enum: ['empty' ,'fill' ,'locked', 'final'],
required: true,
default : 'empty'
},
//--if this is free or paid content
free:{
	type: Boolean ,
	required:true ,
default : false 
},

filename: {
type: String,
required: true,
unique: true  //important to avoid dublication
},

filledBy: {
type: String,
required: false
},

slides: {
type: [SlidesSchema],
required: true,
default : []
},

teacherComments:{
type:String ,
required:false ,
},

adminComments:{ 
type:String ,
required:false ,
}

});

const fbise9math = mongoose.model('fbise9math', QuestionSchema);
const fbise10math = mongoose.model('fbise10math', QuestionSchema);
const fbise8math = mongoose.model('fbise8math', QuestionSchema);
const experimental = mongoose.model('experimental', QuestionSchema);

module.exports = {QuestionSchema,fbise9math,fbise10math,fbise8math,experimental};