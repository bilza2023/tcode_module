const ErrList = require('../../skillzaaError/skillzaaErrList');



function errorSkillzaa(){
    throw ErrList.getErr('testError');
}

module.exports = errorSkillzaa;