
const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");
let registered = false;
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
    if(!registered) {registered = true;}
    else {return {ok:false,message : "already registered"}}


    for (let i = 0; i < list.length; i++) {
    
        
        const tcode_name = list[i];

        if (mongoose.modelNames().includes(tcode_name)) {
            console.warn(`Model "${tcode_name}" already exists, skipping...`);
            return; // Skip registering this TCode
        }
        
        const mongoose_mdl =  mongoose.model(tcode_name, TCodeSchema);
        const tcode_mdl =  new TCode(mongoose_mdl);
        
        tcodeModels.push ({
            key : tcode_name,
            value : tcode_mdl
        });
    }


}

module.exports = {getTcode,registerTcode};