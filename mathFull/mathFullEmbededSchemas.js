const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///////////////////////////////////////////////////////////
/////////////////////////////////EQ SCHEMA ////////////////
///////////////////////////////////////////////////////////

const fsSchema = new Schema({
  code: { // Code string
    type: String,
    required: true,
    default : ''
  },
  type: { // Type of content:
    type: String,
    required: true,
    //-so that we always know that we have atleast 1 comp always working
    default : 'TestComp'
  }
});

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
	type: fsSchema ,
	required:false ,
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
    required: true,
    default : () => ({}),
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
	} 
});

// const Eqs = mongoose.model('Eq', eqsSchema);
// const Grid = mongoose.model('Grid', gridSchema);

module.exports = {eqSchema,gridSchema};