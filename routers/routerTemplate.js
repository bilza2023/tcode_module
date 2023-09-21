/**
2023-6-26

 */
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');
//////////----Mongoose Model Object----//////////////////
const {Template} = require("../models/survey/survey");
/////////////////////////////////////////////////////////////
const getSurvey = require('./templateFn/getSurvey');  
const updateSurvey = require('./templateFn/updateSurvey');  
// const getData = require('../mongoWrapper/getData');  
/////////////////////////////////////////////////
const routerTemplate = express.Router();
routerTemplate.use(auth);
const mongoWrapper = new MongoWrapper(Template);
/////////////////////////////////////////////////

routerTemplate.post("/create", async function(req, res) {
  try{ 
  // debugger;
    const backendData = {checkMaxValue : appConfig.MAX_TEMPLATE_ALLOWED};

        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        getSurvey, //--the data fn for new object newObjDataFunction
        ['title'], //--array for getData from post.body
        [mongoWrapper.checks.checkMax], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    catchFn(error,res);
  }
});

routerTemplate.post("/update", async function(req, res) {
  try{
  debugger;
    const backendData = {};

        return  await mongoWrapper.update(
        req,res, //--The usual req and res
         'item',
        ['item'], //--array for getData from post.body
        [updateSurvey], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
//--read is get since Get cant have data just token
routerTemplate.get( "/read" , async function(req,res) {
 try{   
    debugger;
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

//--readOne is post since it needs to send id
routerTemplate.post( "/readone" , async function(req,res) {
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
////////////////////////////////////////////////////////
//--readOne is post since it needs to send id
routerTemplate.post( "/delete" , async function(req,res) {
 try{   //debugger;
    const backendData = {};
        return  await mongoWrapper.delete(
        req,res, //--The usual req and res
        ['id'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
module.exports = routerTemplate;
////////////////////////////////////////////////////////
