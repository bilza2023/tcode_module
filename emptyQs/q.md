I am creating a loop in node.js to create a sequence of documents in my mongodb database.
The data is related to a book of mathematics.
    - The book has chapters
    - each chapter has exercises
    - each exercise has questions
    - each question has parts.
I want 1 database entry for each part. 1 part  = 1 database entry

Here is the data:
export const FBISE9thData = {
board: 'FBISE',
class: 9,
chapters:[
        [
            {ex: "1.1" , q : [8,10,1]},          
            {ex: "1.2" , q : [6,9,5,5,6,2]},          
            {ex: "1.3" , q : [6,6,9,6,10,2,1,6]},          
            {ex: "1.4" , q : [5,2,5,5,4,2]},          
            {ex: "1.5" , q : [4,4,4,2,2,2]},          
            {ex: "1.6" , q : [8,1,1,1,1,1]},  
        ],
        [
            {ex: "2.1" , q : [6,6,5,6,1,3]},          
            {ex: "2.2" , q : [9,1,1]},          
            {ex: "2.3" , q : [4,4,4]},          
            {ex: "2.4" , q : [4,1,4]},          
            {ex: "2.5" , q : [6,6,6,1]},          
            {ex: "2.6" , q : [7,4,4,6,4,6,3]},          
        ],
        [
            {ex: "3.1" , q : [10,4]},          
            {ex: "3.2" , q : [4,4,2,4,2,5]},          
            {ex: "3.3" , q : [6,1,4,2,5]},          
            {ex: "3.4" , q : [8,1,1,1,1]},          
        ],
        [
            {ex: "4.1" , q : [4,4,8,5,6,5]},          
            {ex: "4.2" , q : [2,1,1,1,1,1,1,1,1,1,1,1,1,2,4]},          
            {ex: "4.3" , q : [4,5,4,5]},          
            {ex: "4.4" , q : [8,8,3,3,2,1]},          
        ],
        [
            {ex: "5.1" , q : [6,4,4,4,6]},          
            {ex: "5.2" , q : [6,4,8,5,4,4]},          
            {ex: "5.3" , q : [5,2,2,1,1,1,1,1,1]},          
        ],
        [
            {ex: "6.1" , q : [2,5,3,2,4,1,1,1,1,1,1]},          
            {ex: "6.2" , q : [1,1,1,1,1,1,1,1,1,1,1,1,1]},          
            {ex: "6.3" , q : [9,5,2,2,3]},          
        ],
        [
            {ex: "7.1" , q : [10,8]},          
            {ex: "7.2" , q : [5,8]},          
            {ex: "7.3" , q : [8,8]},          
        ],
        [
            {ex: "8.1" , q : [1,14,5,6,5]},          
            {ex: "8.2" , q : [2,1,7,4]},          
            {ex: "8.3" , q : [1,1,1,1,1]},          
        ],
        [
            {ex: "9.1" , q : [6,6]},          
            {ex: "9.2" , q : [1,1,1,1,1,1,1,1,1,1]},          
            {ex: "9.3" , q : [6,1,1,1,1,1]},          
        ] 

]//chapters end
}

lets look at one of the chapters array

 [
            {ex: "1.1" , q : [8,10,1]},          
            {ex: "1.2" , q : [6,9,5,5,6,2]},          
            {ex: "1.3" , q : [6,6,9,6,10,2,1,6]},          
            {ex: "1.4" , q : [5,2,5,5,4,2]},          
            {ex: "1.5" , q : [4,4,4,2,2,2]},          
            {ex: "1.6" , q : [8,1,1,1,1,1]},  
        ]
Each item / object represents an exercise, the name of the exercise is given in "ex" field. The q[] represents questions. the number of questions in each exercise is represented by q.length. 
Each value inside the q array represents the parts.

for example
{ex: "1.1" , q : [8,10,1]},
exercise 1.1 has 3 questions with question 1 has 8 parts, question 2 has 10 parts and question 3 has 1 part.

REQUIREMENT : Create me a function that takes in this data and create an entry into mongdb for each part.

Here is my code that i tried to write . you can use this as a reference

const {FBISE9th} = require('../models/mathQuestion');
const FBISE9thData = require("./FBISE9th.js");

// questionNo , part filename
module.exports = async function faker() {
  try {

  for (let i = 0; i < FBISE9thData.chapters.length; i++) {
    const chapter = FBISE9thData.chapters[i];
            
      for (let j = 0; j < chapter.q.length ; j++) {
        for (let part = 0; part < array.length; part++) {
          const element = array[part];
          
        
          const part =  chapter.q[j]          
          const question = {};
          question.board = FBISE9thData.board; 
          question.class = FBISE9thData.class; 
          question.chapter = i+1; 
          question.exercise = chapter.ex; 
          question.questionNo = j+1; 
          question.part = j+1; 

        exerciseData.filename =  `${exerciseData.board.toLowerCase()}_cl_${exerciseData.class}_ch_${exerciseData.chapter}_ex_${exerciseData.exercise}_q_${exerciseData.questionNo}_pt_${exerciseData.part}`;
        ;

      await MathQuestion.create(exerciseData);
    console.log(`${exerciseData.filename} inserted successfully.`);  
    }            
      }//j
          
}//i
        // Insert the custom data into the database
     
    // }
  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
};

Just for reference here is the mongoose Schema of each question
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
	status:{// Part string 
	  type: String ,
	  required:true ,
    enum: ['empty', 'fill', 'review','final'],
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
	eqs:{
	type:[eqSchema] ,
	required:true ,
	default :[]
  } 
  
});

const MathQuestion = mongoose.model('Math', MathSchema,"matht");
const FBISE9th = mongoose.model('Math', MathSchema,"fbise9th");

module.exports = {MathQuestion,FBISE9th};