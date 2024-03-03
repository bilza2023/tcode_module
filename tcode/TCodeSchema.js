const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlidesSchema = require('./slidesSchema');
/**
 =========================== TcodeSchema =======================
 1 : board ***removed   : ['bisep', 'fbise'], *** removed
 2 : classNo ***removed : Number , *** removed
 3 : filename ***added  : String - auto added
 4 : chapter ***REQUIRED: Number , required - ONLY REQUIRED FILED
 ==============================================================
 5 : exercise           : String , -
 6 : questionNo         : Number , -
 7 : part               : Number , -
 8 : name               : String , -
 9 : isSpecial          : False  , -
 10 : teacherComments   : String  , -
 11 : adminComments     : String  , -
 12 : questionType      : ['paid', 'login' , 'free'],  , "paid"
 13 : status            : ['empty' ,'fill' ,'locked', 'final'], "empty"
 14 : filledBy          : String, -
 15 : schemaType        : String, "mathSchema"
 16 : slides            : [Slides], -
 17 : version           : Number, 0.1
 18 : sortOrder         : Number, 0

 */
///////////////////////////////////////////
const TCodeSchema = new Schema({
//1
//   board: { // Board name, can be one of the specified values
//             type: String,
//             enum: ['bisep', 'fbise'],
//             required: true
//         },
//2
// classNo: { // Class number
//           type: Number,
//           required:true 
//         },
//3       
filename: {
  type: String,
  required: true,
  unique: true 
},
//4
chapter:{ // Chapter number 
          type:Number ,
          required:true , 
          },
//5          
exercise:{ 
        type:String ,
        required:false ,
        },
//6        
questionNo:{//same as above 
        type:Number ,
        required:false ,
        },
//7        
part:{  
        type:Number ,
        required:false ,
        },
//8
name:{  
      type:String ,
      required:false ,
      },
//9      
// isSpecial:{ 
//         type:Boolean ,
//         required:false ,
//         default:false
//         },
//10        	
teacherComments:{
      type:String ,
      required:false ,
      },
//11     
adminComments:{ 
      type:String ,
      required:false ,
      },
//12
questionType:{ 
        type: String ,
        enum: ['paid', 'login' , 'free'],
        required: true,
        default : 'paid'
      },
//13      
status:{
	  type: String ,
	  required:true , 
    enum: ['empty' ,'fill' ,'locked', 'final'],
    required: true,
    default : 'empty'
	  },
//14
	filledBy: {
        type: String,
        required: false
        },
  //--There are no rules implemented here. rules will be implemented in functions denoted by schemaType
//15      
schemaType: {
        type: String,
        required: false,
        default : "mathSchema"
        },
//16	
slides: {
        type: [SlidesSchema],
        required: true,
        default : []
        },
//17        
version: {
          type: Number,
          default: 0.1,
          required: true
        },	
//18        
sortOrder: {
          type: Number,
          default: 0,
          required: true
        }	
  
});
//This is where we can change the table/collection name
// const MathFull = mongoose.model('MathFull', TCodeSchema);

module.exports = TCodeSchema;