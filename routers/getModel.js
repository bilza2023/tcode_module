
const {fbise9math,fbise10math,fbise8math} = require('./q_manager/questionSchema/QuestionSchema.js');



async function getModel(tcode){

    switch (tcode) {
        case 'fbise8math':
            return fbise8math;
            break;
        case 'fbise9math':
            return fbise9math;
            break;
            
        case 'fbise10math':
            return fbise10math;
            break;
    
        default:
            return false;
        break;
    }
}

module.exports = getModel;