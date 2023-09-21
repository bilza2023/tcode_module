const moment = require('moment-timezone');

function isPublished(publishObj) {
  let ret = {
    publishTime: null,
    unpublishTime: null,
    publishStatus: null,
    waitingTime: null,
    remainingTime: null
  };

  // Calculate the start time of the survey
  let startTime;
  if (publishObj.publishTechnique === 'now') {
    startTime = moment.tz(publishObj.runStartTime, 'Asia/Karachi');
    
  } else if (publishObj.publishTechnique === 'at') {
    startTime = moment.tz(publishObj.publishDate, 'Asia/Karachi')
      .set({ hour: publishObj.hour, minute: publishObj.min });
  }
  ret.publishTime = startTime.toDate();

  // Calculate the end time / unpublish time
  let endTime;
  if (publishObj.unpublishTechnique === 'never') {
    endTime = null;
  } else if (publishObj.unpublishTechnique === 'after') {
    endTime = moment(startTime).add(publishObj.unpublishHour, 'hours').add(publishObj.unpublishMin, 'minutes');
  }
  ret.unpublishTime = endTime ? endTime.toDate() : null;

  // Determine the publish status and waiting/remaining times
  let now = moment().tz('Asia/Karachi');

  if (now < startTime) {
    ret.publishStatus = 'waiting';
    let waitingDuration = moment.duration(startTime.diff(now));
    ret.waitingTime = { hours: waitingDuration.hours(), minutes: waitingDuration.minutes() };
  } else if (endTime && now > endTime) {
    ret.publishStatus = 'unpublished';
  } else {
    ret.publishStatus = 'published';
    ret.remainingTime = endTime ? endTime.diff(now, 'milliseconds') : null;
  }

  return ret;
}

module.exports = isPublished;
