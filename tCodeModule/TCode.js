
const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCodeObj = require("./TCodeObj");
// const fbise8math = mongoose.model('fbise8math', TCodeSchema);
// const fbise9math = mongoose.model('fbise9math', TCodeSchema);
// const fbise10math = mongoose.model('fbise10math', TCodeSchema);
// const matrices = mongoose.model('matrices', TCodeSchema);

class TCode {
  
static get(tcode){
    const mdl =  mongoose.model(tcode, TCodeSchema);
    return new TCodeObj(mdl)
}


}


module.exports = TCode;