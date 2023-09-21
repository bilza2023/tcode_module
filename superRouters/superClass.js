
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const ClassObj = require("../models/class");
const getClass =  require('./classFn/getClass');
const checkMax =  require('./checks/checkMax');
const classHasResult =  require('./classFn/classHasResult');
const {MAX_CLASSES_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = ClassObj;
    opt.debugMode = true; ///make it false after completion.
    opt.create.getNewObjDataFn = getClass;
    opt.create.checks = [ checkMax ];
    opt.delete.checks = [ classHasResult ];

    opt.create.backendData = {       
            checkMaxValue : MAX_CLASSES_ALLOWED       
        };        
///////////////////////////////////////////
const superClass = getSuperRouter(opt);
module.exports = superClass;