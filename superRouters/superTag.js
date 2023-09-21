
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const {Tag} = require("../models/models");
const getTag =  require('./tagFn/getTag');
const checkMax =  require('./checks/checkMax');
const {MAX_TAGS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    // debugger;
    const opt = new SuperRouterOptions();
    opt.model = Tag;
    opt.debugMode = true; ///make it false after completion.
    opt.create.getNewObjDataFn = getTag;
    opt.create.checks = [
        checkMax
    ];
    opt.create.backendData = {       
            checkMaxValue : MAX_TAGS_ALLOWED       
        };
///////////////////////////////////////////
const superTag = getSuperRouter(opt);
module.exports = superTag;
