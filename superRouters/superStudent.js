
const getSuperRouter  = require('../superRouter/getSuperRouter');
const SuperRouterOptions = require('../superRouter/superRouterOptions');
const Student = require("../models/student");
const getNewObjDataFn =  require('./studentFn/getStudent');
const checkMax =  require('./checks/checkMax');
const studentHasResult =  require('./studentFn/studentHasResult');
const {MAX_STUDENTS_ALLOWED} = require('../common/appConfig');
////////////////////////////////////////
    const opt = new SuperRouterOptions();
    opt.model = Student;
    opt.create.getNewObjDataFn = getNewObjDataFn;
    opt.create.checks = [ checkMax ];
    opt.delete.checks = [ studentHasResult ];

    opt.create.backendData = {        
            checkMaxValue : MAX_STUDENTS_ALLOWED       
        };
///////////////////////////////////////////
const superStudent = getSuperRouter(opt);
module.exports = superStudent;