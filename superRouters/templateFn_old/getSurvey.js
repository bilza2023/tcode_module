

function getSurvey(data) {
   const svy = { 
        userId : data.userId,
        title : data.title,
        saveResponse : false,
        showIntro : true,
        introText : "Welcome",
        published : false,
        showResult : true,
        showfarewellText : true,
        farewellText : "Goodbye",
        publishObj : {
            publishTechnique:'now' , 
            unpublishTechnique : 'never',
            hour:9, 
            min: 30, 
            unpublishHour:1,
            unpublishMin :0,
            publishDate:null
            },
        members : [],
        questions : []
   }
 return svy;   
}

module.exports = getSurvey;