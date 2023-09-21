/** 2023-6-28 **/
require('dotenv').config();

const bodyParser        = require('body-parser');
const auth              = require('../middleware/auth');
const express           = require('express');
const create            =  require('./methods/create');
const read              =  require('./methods/read');
const readone           =  require('./methods/readone');
const update            =  require('./methods/update');
const del               =  require('./methods/delete');
const where               =  require('./methods/where');
const getData           =  require('./coreFunctions/getData');
const getDataNonAuth    =  require('./coreFunctions/getDataNonAuth');
const catchFn           =  require('./coreFunctions/catchFn');

//////////----Mongoose Model Object----//////////////////
/////////////////////////////////////////////////

function getSuperRouter(opt){

 const superRouter = express.Router();
      if (opt.useAuth === true) {
            superRouter.use(auth);
      }

 superRouter.use(bodyParser.json()); // for parsing application/json
 superRouter.use(bodyParser.urlencoded({ extended: true })); // for parsing 
 //////////////////=======CREATE
 superRouter.post("/create",  async function(req, res) { 
      try{
      // debugger;
      let data;
      if (opt.useAuth === true) {
            data = getData(req);
      }else {
            data = getDataNonAuth(req);
      }
      const item = await create(data,opt); 
                  return res.status(200).json({item});
      }catch(err){
            // debugger;
            catchFn(err,res);
      }
});

 ////////////////////////////////////////////////////////
 //////////////////=======DELETE

 superRouter.post("/delete",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await del(data,opt);
                   return res.status(200).json({item})
      }catch(err){
            debugger;
            catchFn(err,res);
      }
});

///////////////////////////////
//////////////////=======UPDATE
 superRouter.post("/update",  async function(req, res) { 
      try{
      debugger;
      const data = getData(req);
      const item = await update(data,opt);
           return res.status(200).json({item})
      }catch(err){
            // debugger;
            catchFn(err,res);
      }
});

//////////////////=======READ
 superRouter.post("/read",  async function(req, res) { 
      try{
      // debugger;
      const data = getData(req);
      const items = await read(data,opt);
           return res.status(200).json({items})    
      }catch(err){
            debugger;
            catchFn(err,res);
      }
});

////////////// //////////////////=======READONE
 superRouter.post("/readone",  async function(req, res) { 
      try{
      // debugger;
      const data = getData(req); 
      const item = await readone(data,opt);   
                   return res.status(200).json({item})
      }catch(err){
            debugger;
            catchFn(err,res);
      }
});

////////////// //////////////////=======WHERE
 superRouter.post("/where",  async function(req, res) { 
      try{
      const data = getData(req); 
      debugger;
      const items = await where(data,opt);   
                   return res.status(200).json({items})
      }catch(err){
            catchFn(err,res);
      }
});
 
 ////////////////////////////////////////////////////////
 return superRouter;
 ////////////////////////////////////////////////////////
}

module.exports = getSuperRouter;