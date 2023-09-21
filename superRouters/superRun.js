
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Run} = require("../models/survey/survey");
const getNewObjDataFn =  require('./runFn/getSurvey');
const checkMax =  require('./checks/checkMax');
const ApplySchemaToQuestions = require('./templateFn_old/ApplySchemaToQuestions.js');
const deleteAllResults = require('./runFn/deleteAllResults');
const {MAX_RUNS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Run;
    opt.create.getNewObjDataFn = getNewObjDataFn;
    opt.create.checks = [
        checkMax
    ];
    
    opt.delete.checks = [
        deleteAllResults
    ];
    
    opt.create.checks = [
        ApplySchemaToQuestions
    ];
    opt.create.backendData = {       
            checkMaxValue : MAX_RUNS_ALLOWED       
        };
///////////////////////////////////////////
const superSurvey = getSuperRouter(opt);
module.exports = superSurvey;