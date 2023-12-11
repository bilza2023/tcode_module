const Presentation = require('../../presentation/presentationSchema');
const MathFullObj = require('../../mathFull/MathFullObj');
// const convertEqsToSlide = require('./convertEqsToSlide');

 async function updateSlidesByTcode(tcode,presentation){
    debugger;
    try{
    const options = { new: false, upsert: true };
    
    switch (tcode) {
        case 'pre':
    let p =  await Presentation.findByIdAndUpdate(presentation._id, presentation, options);
        break;

        case 'fbise9math':
        let q =  await MathFullObj.Update(presentation, options);
        break;
    
        default:
        break;
    }
return true;
    }catch(e){
     return e;
    }
}
module.exports  = updateSlidesByTcode;