require('dotenv').config();

const express  =require('express');
const db = require("./mongoDb/mongo.js");

const {getTcode,registerTcode} = require('./index.js');

////////////////////////////////////////////////
// const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
 debugger;
    const mdl = await getTcode('fbise9math');    
    const map = await mdl.chapterMap();    
res.status(500).json({success :true ,  message : "Welcome to Taleem API" ,map});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',async()=> {
    // debugger;
    console.log("MongoDb ===> connection established")
    registerTcode([ 
        "fbise9math" , 
        "fbise10math" ,
        
        "fbise9english" ,
        "fbise10english" ,
        
        "matrices", 
        
        "videoblog" ,
        
        "testtable"]);
        app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});     
});
///////////////////////////////////////////////////////////////////////






