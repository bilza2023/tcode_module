require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require("./mongoDb/mongo.js");

const MathFullObj = require("./mathFull/MathFullObj.js");
const {MathFull} = require("./mathFull/mathFull.js");
// const addSyllabus = require('./syllabus/addSyllabus.js');
///////////////////////////////////////////////
///////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});


db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Admin Panel Operations unsecure... ===>>");

    async function run(){
//--code
let count =1;
        const syllabus = await MathFull.find({});
        for (let i = 0; i < syllabus.length; i++) {
            const eqs = syllabus[i];
            if(eqs && )
            for (let j = 0; j < eqs.length; j++) {
                const eq = eqs[j];
                console.log(`# ${count++}` , eq.fs);
            }
            
        }
console.log("done..");
process.exit(1);
    }

    run();
});

