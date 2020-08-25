const httpStatus = require('http-status');
const { Das, Env, Exercise, Msu, Sleep, Stress, Symptom, Daily, Weekly } = require('../models');
const ApiError = require('../utils/ApiError');

const models = {
  das: Das,
  environment: Env,
  exercise: Exercise,
  msu: Msu,
  sleep: Sleep,
  stress: Stress,
  symptom: Symptom,
};

const createRecord = async (recordModel, data) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const rec = await models[recordModel].create(data);
  console.log('Record created for', recordModel, rec);
  return rec;
};

const addToDaily = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const d = new Date();
  const today = new Date(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 8:00:000');

  let dailyRecord = await Daily.findOne({userId, day: today});

  console.log("Today's record", dailyRecord);

  let update = {};
  update[recordModel] = recordId;

  if(dailyRecord){
    const res = await Daily.updateOne({_id: dailyRecord.id}, update);
    console.log("Daily Record Updated!", res);
  }
  else{
    update.userId = userId;
    update.day = today;
    const res = await Daily.create(update);
    console.log("Daily Record Created!", res);
  }

};

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return d.getUTCFullYear() + '-' + (weekNo-1);
}


const addToWeekly = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const week = getWeekNumber(new Date());


  let weeklyRecord = await Weekly.findOne({userId, week});

  console.log("Week's record", weeklyRecord);

  let update = {};
  update[recordModel] = userId;

  if(weeklyRecord){
    const res = await Weekly.updateOne({_id: weeklyRecord.id}, update);
    console.log("Weekly Record Updated!", res);
  }
  else{
    update.userId = userId;
    update.week = week;
    const res = await Weekly.create(update);
    console.log("Weekly Record Created!", res);
  }
};




module.exports = {
  createRecord,
  addToDaily,
  addToWeekly
};
