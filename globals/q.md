This is a publishObj in my node.js mongodb express app.

  publishObj : {
            publishTechnique:'now' , 
            unpublishTechnique : 'never',
            hour:9, 
            min: 30, 
            unpublishHour:1,
            unpublishMin :0,
            publishDate:null
            },

I give publishObj to a function called isPublished.

function isPublished(publishObj) {
  let ret = {
    publishTime: null, 
    unpublishTime: null, 
    publishStatus: null, 
    waitingTime: null, 
    remainingTime: null
  };
  // debugger;
  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
  } else if (publishObj.publishTechnique === "at") {
    startTime = new Date(publishObj.publishDate);
    startTime.setHours(publishObj.hour, publishObj.min);
    debugger;
  //--auto convert to Pk Std Time 
    startTime = startTime.toLocaleString("en-US", { timeZone: "Asia/Karachi" });

  }
  ret.publishTime = startTime;

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === "never") {
    endTime = null;
  } else if (publishObj.unpublishTechnique === "after") {
    endTime = new Date(startTime.getTime());
    endTime.setHours(endTime.getHours() + publishObj.unpublishHour);
    endTime.setMinutes(endTime.getMinutes() + publishObj.unpublishMin);
   //===> convert to Pakistan Standard Time
    endTime = endTime.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
  }
  ret.unpublishTime = endTime;

  // Determine the publish status and waiting/remaining times
  let now = new Date();
  now = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
  if (now < startTime) {
    ret.publishStatus = "waiting";
    let waitingMs = startTime - now;
    let waitingHours = Math.floor(waitingMs / (1000 * 60 * 60));
    let waitingMinutes = Math.floor((waitingMs % (1000 * 60 * 60)) / (1000 * 60));
    ret.waitingTime = { hours: waitingHours, minutes: waitingMinutes };
  } else if (endTime && now > endTime) {
    ret.publishStatus = "unpublished";
  } else {
    ret.publishStatus = "published";
    ret.remainingTime = endTime ? endTime - now : null;
  }
 
  return ret;
}

module.exports = isPublished;


-- There are some problems since the time on my localhost is Pakistan standard time where as on the actual server time is not  Pakistan/karachi time. for this the isPublished works well when on localhost but on server it does not. 
The issue is that in mongodb time is saved in UTC format  so when i get it in publishObj i must convert it into localtime/karachi time. 

please check this code to see if i am doing it correctly.i have changed startTime , endTime and also "now" to the Pakistan standard time so that they can be compared.