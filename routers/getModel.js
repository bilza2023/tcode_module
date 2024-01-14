
const {fbise9math,fbise10math,fbise8math,experimental,fbise9english} = require('./q_manager/questionSchema/QuestionSchema.js');


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
            
    //new 2024-jan-13
        case 'experimental':
            return experimental;
    
            break;
    //new 2024-jan-13
        case 'fbise9english':
            return fbise9english;
            break;

        default:
            return false;
        break;
    }
}

module.exports = getModel;