const mongoose = require('mongoose');


function getResponseData(quizId,userId,email){

    return {
        id : new mongoose.Types.ObjectId().toString(),
        userId,
        quizId,
        email,
        ip : '203.0.113.0',
        countryCode : 'PK',
        answers :[]
    };
}

module.exports = getResponseData;
