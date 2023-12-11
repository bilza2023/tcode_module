const Presentation = require('../../presentation/presentationSchema');
const MathFullObj = require('../../mathFull/MathFullObj');
const convertEqsToSlide = require('./convertEqsToSlide');

 async function slidesByTcode(tcode,id){
 let slides = null;
 let item = null;
    switch (tcode) {
        case 'pre':
        const presentation = await Presentation.findById( id ).lean();
        if (presentation){slides = presentation.slides; item = presentation}
        break;

        case 'fbise9math':
        const resp = await MathFullObj.Get( id );
            if (resp){
            // debugger;
            try{
            slides = resp.question.slides;
            item = resp.question;
                if (!slides){
                slides = [];
                // slides = await convertEqsToSlide(resp.question.eqs);
                }
            }catch(e){
               slides = []; //added on 17-nov-2023
            }
            }
        break;
    
        default:
        break;
    }
return {slides,item};
}
module.exports  = slidesByTcode;