
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Test} = require("../models/models");
const getNewObjDataFn =  require('./testFn/getSurvey');
const checkMax =  require('./checks/checkMax'); 
const {MAX_TESTS_ALLOWED} = require('../common/appConfig');
const ApplySchemaToQuestions = require('./templateFn_old/ApplySchemaToQuestions.js');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Test;
    opt.create.getNewObjDataFn = getNewObjDataFn;
    opt.create.checks = [
        checkMax
    ];
    opt.update.checks = [
        ApplySchemaToQuestions
    ];
    opt.create.backendData = {       
            checkMaxValue : MAX_TESTS_ALLOWED       
        };
///////////////////////////////////////////
const superTest = getSuperRouter(opt);
module.exports = superTest;