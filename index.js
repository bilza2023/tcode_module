
const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");

const tcodeModels = [];

function getTcode(tcode_name){
    
    for (let i = 0; i < tcodeModels.length; i++) {
        
        const tcode_model = tcodeModels[i];
        if(tcode_model.key == tcode_name){
            return tcode_model.value;
        }
    }
 return false;    
}

function registerTcode(list=[]){

    for (let i = 0; i < list.length; i++) {
        
        const tcode_name = list[i];
        
        const mongoose_mdl =  mongoose.model(tcode_name, TCodeSchema);
        const tcode_mdl =  new TCode(mongoose_mdl);
        
        tcodeModels.push ({
            key : tcode_name,
            value : tcode_mdl
        });
    }


}

module.exports = {getTcode,registerTcode};