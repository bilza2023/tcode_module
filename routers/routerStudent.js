/** 2023-6-26 */
//////////----dont change these ------//////////////////////////////
require('dotenv').config();
const auth = require('../middleware/auth');
const express = require('express');
const appConfig = require("../common/appConfig");
const catchFn = require('../mongoWrapper/catchFn');
const MongoWrapper = require('../mongoWrapper/mongoWrapper');
//////////----Mongoose Model Object----//////////////////
const student = require("../models/student");
const getStudent =  require('./studentFn/getStudent.js');
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
const routerStudent = express.Router();
routerStudent.use(auth);
const mongoWrapper = new MongoWrapper(student);
/////////////////////////////////////////////////

routerStudent.post("/create", async function(req, res) {
  try{ 
  
    const backendData = {checkMaxValue : appConfig.MAX_STUDENTS_ALLOWED};

        return  await mongoWrapper.create(
        req,res, //--The usual req and res
        getStudent, //--the data fn for new object newObjDataFunction
        ['id','name'], //--array for getData from post.body
        [mongoWrapper.checks.checkMax], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    catchFn(error,res);
  }
});

routerStudent.post("/update", async function(req, res) {
  try{
//   debugger;
    const backendData = {};
        return  await mongoWrapper.update(
        req,res, //--The usual req and res
         'item',
        ['item'], //--array for getData from post.body
        [], //--check functions
        backendData);//--data that did not come from front-end
  }catch (error) {
    return catchFn(error,res);
  }
});
//--read is get since Get cant have data just token
routerStudent.get( "/read" , async function(req,res) {
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
routerStudent.post( "/readone" , async function(req,res) {
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
routerStudent.post( "/delete" , async function(req,res) {
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
module.exports = routerStudent;
////////////////////////////////////////////////////////
