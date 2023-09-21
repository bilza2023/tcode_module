require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const setAllFreeFalse = require("./emptyQs/setAllFreeFalse.js");
///////////////////////////////////////////////
///////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Creating Questions... ===>>");

    async function run(){
        await setAllFreeFalse();
        process.exit(1);
    }

    run();
});

//////////////////////////////////////////////
