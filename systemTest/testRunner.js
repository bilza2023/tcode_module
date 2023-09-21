require('dotenv').config();
///////////////////////////////////////////////////
const basicTest = require('./basicTest/basicTest.js');
///////////////////////////////////////////////

async function runTests(){
    
console.log("Test Runner  Begins=>>");

     await basicTest();

console.log("Test Runner  Endes=>>");
} 

//////////////////////////////////////////////

module.exports = runTests;
