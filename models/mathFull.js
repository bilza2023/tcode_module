const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    }
  
});

const MathFull = mongoose.model('MathFull', MathFullSchema);

module.exports = {MathFull};