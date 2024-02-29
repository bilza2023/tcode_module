
const mongoose = require('mongoose');
const TCodeSchema = require('./tcode/TCodeSchema');
const UserSchema = require('./user/UserSchema');
const TCode = require("./tcode/TCode");
const User = require("./user/User");
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

function getUser(){
   return  getTcode("user");
}

function registerTcode(list=[]){
    debugger;
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
    //--push user
    const mongoose_user_mdl =  mongoose.model("User", UserSchema);
    const userObj = new User(mongoose_user_mdl);
    tcodeModels.push ({
        key : "user",
        value : userObj
    });
//   console.log("tcodeModels",tcodeModels);  
}
module.exports = {getTcode,registerTcode,getUser};