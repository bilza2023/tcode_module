
const auth = require('../middleware/auth');
const express = require('express');

const getData = require('../mongoWrapper/getData');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');
const {Test} = require("../models/survey/survey");
const find = require('./find');
const retRes = require('../common/skillzaaError/retRes');
const run = require('./run');
const save = require('./save');
const checkForResponses = require('./fn/checkForResponses');
const catchFn = require('../mongoWrapper/catchFn');

/////////////////////////////////////////////////
const routerTest = express.Router();
routerTest.use(auth);
const mongoWrapper = new MongoWrapper(Test);
/////////////////////////////////////////////////
 

routerTest.get( "/read" , async function(req,res) {
 try{  // debugger;
    const backendData = {};
        return  await mongoWrapper.read(
        req,res, //--The usual req and res
        [ ], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  } catch (error) {
    return catchFn(error,res);
  }
});
//--readOne is post since it needs to send id
routerTest.post( "/readOne" , async function(req,res) {
 try{   //debugger;
    const backendData = {};
        return  await mongoWrapper.readOne(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

routerTest.post( "/delete" , async function(req,res) {
 try{   debugger;
    const backendData = {};
        return  await mongoWrapper.delete(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        [checkForResponses], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

routerTest.post("/update", async function(req, res) {
  try{
  // debugger;
    const backendData = {};
        return  await mongoWrapper.update(
        req,res, //--The usual req and res
        'test',
        ['test'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
//--you can just copy paste
routerTest.get( "/read" , async function(req,res) {
 try{   //debugger;
    const backendData = {};

        return  await mongoWrapper.read(
        req,res, //--The usual req and res
        [ ], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

///////////////////////////////////////////////////////////////////////
routerTest.post("/find", async function(req, res){find(req,res);});

 
////////////////////////////////////////////////////////
//--modernize it later
routerTest.post("/run", async function(req, res) {run(req, res);});

////////////////////////////////////////////////////////
module.exports = routerTest;
////////////////////////////////////////////////////////


