
const {fbise9math} = require('./q_manager/questionSchema/QuestionSchema.js');



async function getModel(tcode){

    switch (tcode) {
        case 'fbise9math':
            return fbise9math;
            break;
    
        default:
            return false;
        break;
    }
}

module.exports = getModel;