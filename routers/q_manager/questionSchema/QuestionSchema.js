const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlidesSchema = require('./slidesSchema');

///////////////////////
const PartnNoSchema = new Schema({
    exercise:{ 
	type:String ,
	required:false ,
	},
	questionNo:{ 
	type:Number ,
	required:false ,
	},
	part:{ 
	type:Number ,
	required:false ,
	},

	name:{  //same as above
	type:String ,
	required:false ,
	}
});
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
	  default :9 
  },
  chapter:{ // Chapter number 
	type:Number ,
	required:true , 
	},

isSpecial:{ 
type:Boolean ,
required:true ,
},	
  partNo:{ // PartnNo 
	type:PartnNoSchema ,
	required:true , 
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
    //unlocked when created and not set at all , fill when filled for first time if we want to change then we have to do it manually.locked when checked by Admin as correct and stuff like FS , SP is being added and finally "final after time inserted"  
	//- ihave removed empty since not if "ref" is empty we know that it is empty. no need for seperate empty.by keeping ref optional we can create a question and its solution seperately 
    enum: ['empty' ,'fill' ,'locked', 'final'],
    required: true,
    default : 'empty'
	},
    //--if this is free or paid content
	free:{// Part string 
	  type: Boolean ,
	  required:true ,
    default : false 
	},
// For file name either we will build this filename from board,chapter, question no , part etc OR the user will give us a name along with board and chapter and we will make use of that.    
	filename: {
    type: String,
    required: true,
    unique: true 
    },
//--will be filled by the teacher whio filled.    
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
	},
	
  
});

module.exports = {QuestionSchema};