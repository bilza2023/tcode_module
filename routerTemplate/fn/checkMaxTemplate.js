
// const {Template} = require("../../models/survey/survey");
// const appConfig = require("../../common/appConfig");
// const skillzaErrList = require('../../common/skillzaaError/skillzaaErrList');

async function checkMaxTemplate(userId){
    try{    
    // // debugger; 
    //   const prev = await Template.count({userId :userId});
    //   if (prev > appConfig.MAX_TEMPLATE_ALLOWED ){
    //      const Err = skillzaErrList.getErr("maxTemplateLimitExceeded");
    //     throw Err;
    //   }else {
    //     return true;
    //   }

    }catch(err){
        throw skillzaErrList.getErr("maxTemplateLimitExceeded");
    }
}

 module.exports = checkMaxTemplate;

 