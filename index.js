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
const routerTest = require('./superRouters/superTest.js');
const routerRun = require('./superRouters/superRun.js');
const routerTag = require('./superRouters/superTag.js');
const routerClass = require('./superRouters/superClass.js');
const routerStudent = require('./superRouters/superStudent.js');
const resultRouter = require('./superRouters/superResult.js');
const userRouter = require('./routes/userRouter');
const nonAuthRouter = require('./routes/nonAuthRouter.js');
////////////////////////////////////////////////
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 80;
////////////////////////////////////////////////////
// debugger;
const app = express()
app.use(cookieParser());
//.. static files
// app.use(express.static(path.join(__dirname,"build")));
//..
app.use(express.json());
app.use(cors( )); //working
// app.use(cors({origin: "http://localhost/"}));
// app.use(cors({ origin: '*' })); //working
// app.use(cors({origin: process.env.HOME_URL})); //use this
app.use(express.urlencoded({ extended: true }));

//.. Route middlewares--/////////////////////////////////////
app.use("/",nonAuthRouter);
app.use("/user",userRouter);
//---Auth Controllers
app.use("/test",routerTest);
app.use("/run",routerRun);
app.use("/result",resultRouter);

app.use("/tag",routerTag);
app.use("/class",routerClass);
app.use("/student",routerStudent);

///////////////////////////Routes////////////////////////
app.get('/', async (req, res) =>{
// const ret = Survey.findById()
res.status(500).json({success :true ,  message : "Welcome to Skillzaa.com"});
// res.status(200).json({success :true ,  message : "Welcome to skillza api"});
});
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
db.once('open',()=> {
    console.log("MongoDb ===> connection established")
    app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});
});
///////////////////////////////////////////////////////////////////////






