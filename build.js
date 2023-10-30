require('dotenv').config();
const db = require("./mongoDb/mongo.js");

const genJson = require("./buildSystem/genJson.js")  ;
///////////////////////////////////////////////

db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    console.log('\x1b[34m%s\x1b[0m' ,"Admin Panel Operations unsecure... ===>>");

    async function run(){
    try {
        
        await genJson();
        console.log("done..");

    } catch(error) {
        console.log("final error!",error);
    }
        process.exit(1);
    }

    run();
});


