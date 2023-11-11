const Presentation = require('../../presentation/presentationSchema');
const MathFullObj = require('../../mathFull/MathFullObj');
const convertEqsToSlide = require('./convertEqsToSlide');

 async function slidesByTcode(tcode,id){
 let slides = null;
    switch (tcode) {
        case 'pre':
        const presentation = await Presentation.findById( id ).lean();
        if (presentation){slides = presentation.slides;}
        break;

        case 'fbise9math':
        const resp = await MathFullObj.Get( id );
            if (resp){
            // debugger;
            slides = resp.question.slides;
                if (!slides){
                slides = await convertEqsToSlide(resp.question.eqs);
                }
            }
        break;
    
        default:
        break;
    }
return slides;
}
module.exports  = slidesByTcode;