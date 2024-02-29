
const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");

function tcode(tcode){
    const mdl =  mongoose.model(tcode, TCodeSchema);
    return new TCode(mdl)
}

module.exports = tcode;