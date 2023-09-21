I am trying to create db entries in my mongodb database using a loop with some data. The database connects but the code does not execute and the db entries are not made. WHY? must be some small subtle error.


Here is main faker.js
require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const faker = require("./emptyQs/emptyQs.js");
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Creating Questions... ===>>");

    async function run(){
        await faker();
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
emptyQs.js
const MathQuestion = require('../models/mathQuestion');
const ex1_1 = require("./ex1_1.js");

const exerciseData = {
board: 'FBISE',
class: 9,
chapter: 1,
exercise: '1.2',
finalized: false,
free: true,
eqs: []
}
// questionNo , part filename
module.exports = async function faker() {
  try {

        for (let i = 0; i < ex1_1.length; i++) {
          const numberOfParts = ex1_1[i];
          exerciseData.questionNo = i+1;
            
            for (let j = 0; j < numberOfParts.length; j++) {

              exerciseData.part = j+1;

exerciseData.filename =  `${exerciseData.board.toLowerCase()}_cl_${exerciseData.class}_ch_${exerciseData.chapter}_ex_${exerciseData.exercise}_q_${exerciseData.questionNo}_pt_${exerciseData.part}`;
;

      await MathQuestion.create(exerciseData);
    console.log(`${exerciseData.filename} inserted successfully.`);              
      }//j
          
}//i
        // Insert the custom data into the database
     
    // }
  } catch (error) {
    console.error('Error inserting MathQuestion records:', error);
  }
};

and finally
ex1_1.js
const ex1_1 = [
6,  //1
9,  //2
5,  //3 
5,  //4
6, //5
2 //6
];

module.exports = ex1_1;  