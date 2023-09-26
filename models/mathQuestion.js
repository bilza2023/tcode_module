const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spfsItem = new Schema({
  code: { // Code string
    type: String,
    required: true,
  },
  type: { // Type of content, can be 'html', 'text', or 'code'
    type: String,
    enum: ['html', 'text', 'code' , 'image','img','table','tbl'],
    required: true
  }
});

///////////////////////
const eqSchema = new Schema({
  step: { // Step number
    type: Number,
    required: true
  },
  type: { // Type of content, can be 'text' or 'code'
    type: String,
    enum: ['text', 'code'],
    required: true,
    default: 'code'
  },
  code: { // Code string
    type: String,
    required: true
  },
  showSPinFS: { // Code string
    type: Boolean,
    required: false
  },
  MPWidth: { // Code string
    type: Number,
    required: true,
    default : 8
  },
  eqStartTime: { // Time number
    type: Number,
    required: false,
    default :0
  },
  eqEndTime: { // Time number
    type: Number,
    required: false,
    default :0
  },
  fsStartTime: { // Time number
    type: Number,
    required: true,
    default :0
  },
  fsEndTime: { // Time number
    type: Number,
    required: true,
    default :0
  },
  sp:{
	type:[spfsItem] ,
	required:true ,
	default :[]
	}, 
  fs:{
	type:[spfsItem] ,
	required:true ,
	default :[]
	} 
});

///////////////////////////////////////////
const MathSchema = new Schema({
  board: { // Board name, can be one of the specified values
    type: String,
    enum: ['Punjab', 'Pakhtoonkhwa', 'Sind', 'Balochistan', 'FBISE'],
    required: true
  },
  class: { // Class number
    type: Number,
    required:true,
	  default :9 
  },
  chapter:{ // Chapter number 
	type:Number ,
	required:true , 
	},
	exercise:{// Exercise string 
	type:String ,
	required:true ,
	},

	questionNo:{// Question number 
	type:Number ,
	required:true ,
	},
	part:{// Part string 
	type:String ,
	required:true ,
	},
	teacherComments:{
	type:String ,
	required:false ,
	},
	adminComments:{ 
	type:String ,
	required:false ,
	},
	status:{// Part string 
	  type: String ,
	  required:true ,
    enum: ['empty','fill', 'locked', 'final'],
    required: true,
    default : 'empty'
	},
	free:{// Part string 
	  type: Boolean ,
	  required:true ,
    defaul : true //change it to false later
	},
	filename: {
    type: String,
    required: true,
    unique: true
    },
	filledBy: {
    type: String,
    required: false
    },
	eqs:{
	type:[eqSchema] ,
	required:true ,
	default :[]
  } 
  
});

const MathQuestion = mongoose.model('Math', MathSchema,"matht");
const FBISE9th = mongoose.model('Math', MathSchema,"fbise9th");

module.exports = {MathQuestion,FBISE9th};