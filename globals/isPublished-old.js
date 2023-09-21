/**
This proved to be very complicated code:
  1. Mongodb saves all dates in UTC format.
  2. when we get date data from mongoDB it is in string fomrat and has to be converted int javascript Date object by : new Date(xxx);
  3. when we read date string from mongoDB it is converted from UTC to the time zone of the server. That is why the code would work fine on localhost but not on server.
  4. to ensure that the date is always in PST when used use convertToPST(). on localhost it has  no effect on but on server it does.
  5. One of the mistake that confused me a lot was that the publishDate was saved in UTC , I will read it , setHours and setMinutes using the "hour"
  and "min" props in publishObj.AND after that try to convert to PST. Just set it and its already in PST but still use convertToPST.
  5b. The publishDate is just date the hours and minutes are in "hour" and "min" props.
  6.  No need to convert endTime into PST just use startTime and add hours and minutes using publishObj.unpublishHour/unpublishMin.
  7. the "now" must be converted to PST since that has to be measured.
 */
function isPublished(publishObj) {
  let ret = {
    publishTime: null,
    unpublishTime: null,
    publishStatus: null,
    waitingTime: null,
    remainingTime: null
  };
debugger;
  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === "now") {
    startTime = new Date(publishObj.runStartTime);
    startTime = convertToPST(startTime);

  } else if (publishObj.publishTechnique === "at") {
    startTime = new Date(publishObj.publishDate);
    startTime.setHours(publishObj.hour);
    startTime.setMinutes(publishObj.min);
    startTime = convertToPST(startTime);
  }
  ret.publishTime = startTime;

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === "never") {
    endTime = null;
  } else if (publishObj.unpublishTechnique === "after") {
    endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + publishObj.unpublishHour);
    endTime.setMinutes(startTime.getMinutes() + publishObj.unpublishMin);
  }
  ret.unpublishTime = endTime;

  // Determine the publish status and waiting/remaining times
  let now = new Date();
  now = convertToPST(now); // important

  let waitingMs = startTime - now;
  if (now < startTime) {
    ret.publishStatus = "waiting";
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
function convertToPST(dateString) {
  const options = { timeZone: 'Asia/Karachi' };
  const dateObj = new Date(dateString);

  return new Date(dateObj.toLocaleString('en-US', options));
}

module.exports = isPublished;
