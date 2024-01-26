require('dotenv').config();
 process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
 });
//.......................................................
const express  =require('express');
const cors = require('cors');
const db = require("./mongoDb/mongo.js");
/////////////////////////////////////////////----->>>>
const backEndRouter = require('./routers/backEndRouter.js');
const registeration = require('./routers/registeration.js');
// const presentationRouter = require('./routers/presentationRouter.js');
// const qManagerRouter = require('./routers/q_manager/qManagerRouter.js');
////////////////////////////////////////////////
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(cookieParser());
//..
app.use(express.json());
app.use(cors( )); //working
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/be",backEndRouter);
app.use("/auth",registeration);
// app.use("/fe",frontEndRouter);
// app.use("/pre",presentationRouter);
// app.use("/q",qManagerRouter);
///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
res.status(500).json({success :true ,  message : "Welcome to BackOffice API"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////






