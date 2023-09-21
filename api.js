require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const runTests = require("./systemTest/testRunner.js");
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"api Base Test testing CRRUD... ===>>");

    async function run(){
        await runTests();
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
