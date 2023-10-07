I have a MathFull schema in which i have 2 fields 

eqs and
grid

here are these Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Eqs,Grid} = require('./mathFullEmbededSchemas');
///////////////////////
const PartnNoSchema = new Schema({
    exercise:{//if isSpecail == true they it have no use just set it to "". 
	type:String ,
	required:false ,
	},
	questionNo:{//same as above 
	type:Number ,
	required:false ,
	},
	part:{  //same as above
	type:String ,
	required:false ,
	},
	//---if its isSpecial the instead of exercise,questionNo,part it will have name
	name:{  //same as above
	type:String ,
	required:false ,
	}
});
///////////////////////////////////////////
const MathFullSchema = new Schema({
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
//if a question does not have exercise , questionNo and partno (though not having partno is not a must) for such questions isSpecial is true. All the questions which do have exercise, questionNo and partno they are not special rather regular questions. Special questions can be like fbise_cl9_ch10_theorem10.1.
// here if isSpecial is true we do not have to read exercise,question no and partno, they are useful  only if the question is NOT special. 
isSpecial:{ 
type:Boolean ,
required:true ,
},	
  partNo:{ // PartnNo 
	type:PartnNoSchema ,
	required:true , 
	},
//ref can NOT be null which means that the question must create  it  eqs record when it is created we will create empty and fill it later.	
  ref:{ //  
	type:  Schema.Types.ObjectId ,
	required: true,
	unique: true,
	},
	teacherComments:{
	type:String ,
	required:false ,
	},
	adminComments:{ 
	type:String ,
	required:false ,
	},
  // unloced = starting , the admin can lock it means now it can not be edited and on final we can add time and it is checked.
	questionType:{ 
	  type: String ,
	  required:true ,
    enum: ['eqs', 'grid'],
    required: true,
	},
	status:{
	  type: String ,
	  required:true ,
    //unlocked when created and not set at all , fill when filled for first time if we want to change then we have to do it manually.locked when checked by Admin as correct and stuff like FS , SP is being added and finally "final after time inserted"  
	//- ihave removed empty since not if "ref" is empty we know that it is empty. no need for seperate empty.by keeping ref optional we can create a question and its solution seperately 
    enum: ['unlocked' ,'fill' ,'locked', 'final'],
    required: true,
    default : 'unlocked'
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
	eqs: {
    type: Eqs,
    required: true,
	default : []
    },
	grid: {
    type: Grid,
    required: true,
	default: {}
    }
  
});

const MathFull = mongoose.model('MathFull', MathFullSchema);

module.exports = {MathFull};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// , 
// 	grid:{
// 	type: gridSchema ,
// 	required:false ,
// 	default :{}
//   } 
///////////////////////////////////////////////////////////
/////////////////////////////////EQ SCHEMA ////////////////
///////////////////////////////////////////////////////////

const spfsItem = new Schema({
//it should be named as content since it does not contain code only but can cnotain all other contents
  code: { // Code string
    type: String,
    required: true,
  },
  type: { // Type of content:
    type: String,
    enum: ['html', 'text', 'code' , 'image','img','table','tbl','tableCode'],
    required: true
  }
});

///////////////////////
const eqSchema = new Schema({
  step: { // Step number
    type: Number,
    required: false
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
const eqsSchema = new Schema({
 eqs:{
 //prev it was not required since it was part of the question and question can be created without a solution but now question is seperate and this is just solution. once it is created it must have some eqs
	type:[eqSchema] ,
	required:true 
  }
});
///////////////////////////////////////////////////////////
///////////////////////Grid Schema/////////////////////////
///////////////////////////////////////////////////////////

const rowSchema = new Schema({
startTime : {
    type: Number,
    required:true,
	  default :0 
  },
endTime : {
    type: Number,
    required:true,
	  default :0 
  },
content : {
    type: String,
    required:true,
	  default :0 
  },
bl : {
    type: Boolean,
    required:true,
	  default :false 
  },
bt : {
    type: Boolean,
    required:true,
	  default :false 
  },
br : {
    type: Boolean,
    required:true,
	  default :false 
  },
bb : {
    type: Boolean,
    required:true,
	  default :false 
  },
type : {
    type: String,
    required:true,
     enum: ['code', 'text'],
	  default :'code' 
  },
});

const globalSchema = new Schema({
bgColor : {
    type: String,
    required:true,
	  default :"#293544" 
  },
fontSize : {
    type: Number,
    required:true,
	  default : 1 
  },
padding : {
    type: Number,
    required:true,
	  default :1 
  },
margin : {
    type: Number,
    required:true,
	  default :1 
  },
cellBorderColor : {
    type: String,
    required:true,
	  default :"#e52222" 
  },
cellFontColor : {
    type: String,
    required:true,
	  default :"white" 
  },
showGrid : {
    type: Boolean,
    required:true,
	  default :false, 
  },
gridColor : {
    type: String,
    required:true,
	  default :"#384556" 
  },
});
//in grid we have 2 main objects global and rows (in eqs we just have 1 obj which is [eq]). also  in Eqs every eq has its internal SP and FS but here we just have global SP and FS
const gridSchema = new Schema({
  global: { 
    type: globalSchema,
    required: false,
  },
  rows: { // Type of content, can be 'text' or 'code'
    type: [[rowSchema]],
    required: true,
    default: []
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

const Eqs = mongoose.model('Eq', eqsSchema);
const Grid = mongoose.model('Grid', gridSchema);

module.exports = {Eqs,Grid};


I want to ask 
is this correct ? 
	eqs: {
    type: Eqs,
    required: true,
	default : []
    },
	grid: {
    type: Grid,
    required: true,
	default: {}
    }