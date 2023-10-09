Here is my problem
- i have mongodb community server installed on my local machine
- it is running fine (after running mongod in terminal) and i can connect to it using mongoosh and MongodbCompass both.
- this is the connection string that is being used by compass mongodb://localhost:27017/
The problem is that i can not connect to my local mongodb server using node.js
here is my mongo.js file to get connection
const mongoose = require('mongoose');
require('dotenv').config();
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
//.......................................................
// mongodb://localhost:27017/
// mongoose.connect( process.env.MONGO_DB_URL , { useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

// mongoose.connect( 'mongodb://localhost:27017' , { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',(error)=> {throw new Error(error)} );


module.exports = db;

and here is admin.js (main.js) file that returns the error
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require("./mongoDb/mongo.js");
const {MathFull} = require("./models/mathFull.js");
const Questions = require("./questions/Questions.js");
// const backup = require('./syllabus/backup.js');
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
    try {
// debugger;
console.log("connected");
    //  await addSyllabus();
        // const total_docs = await MathFull.countDocuments();
        // const total_docs = await MathFull.find({'partNo.part': 0});
        // const total_docs = await MathFull.countDocuments({'partNo.part': { $ne: 0 }});
        // Questions.CreateQReg('eqs','FBISE',9,1,"1.1",1,0);

    } catch(error) {
        console.log("final error!",error);
    }
        process.exit(1);
    }

    run();
});




This is the error i am getting 
node admin
Mon, 09 Oct 2023 08:35:40 GMT uncaughtException: MongoServerSelectionError: connect ECONNREFUSED ::1:27017
Error: MongoServerSelectionError: connect ECONNREFUSED ::1:27017
    at NativeConnection.<anonymous> (C:\admin\mongoDb\mongo.js:15:32)
    at NativeConnection.emit (node:events:513:28)
    at C:\admin\node_modules\mongoose\lib\connection.js:710:30
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)      
PS C:\admin> 
