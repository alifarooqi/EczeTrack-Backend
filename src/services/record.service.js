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
  return await models[recordModel].create(data);
};

const getToday = () => {
  const d = new Date();
  return new Date(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' 8:00:000');
};

const addToDaily = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');

  const today = getToday();

  let dailyRecord = await Daily.findOne({ userId, day: today });

  let update = {};

  if (recordModel === "das") {
    if (dailyRecord) {
      return await Daily.updateOne({ _id: dailyRecord.id },
        {
          $push: { das: recordId }
        }
      );
    } else {
      update.userId = userId;
      update.day = today;
      update[recordModel]= [recordId]
      return await Daily.create(update);
    }
  }

  update[recordModel] = recordId;

  if (dailyRecord) {
    await Daily.updateOne({ _id: dailyRecord.id }, update);
  }
  else {
    update.userId = userId;
    update.day = today;
    await Daily.create(update);
  }

};

function getWeekNumber() {
  let d = new Date();
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return d.getUTCFullYear() + '-' + (weekNo - 1);
}


const addToWeekly = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const week = getWeekNumber();


  let weeklyRecord = await Weekly.findOne({ userId, week });

  let update = {};
  update[recordModel] = userId;

  if (weeklyRecord) {
    await Weekly.updateOne({ _id: weeklyRecord.id }, update);
  }
  else {
    update.userId = userId;
    update.week = week;
    await Weekly.create(update);
  }
};

const checkWeekly = async userId => {
  const week = getWeekNumber();
  let weeklyRecord = await Weekly.findOne({ userId, week });
  let response = {
    sleep: false,
    stress: false,
    exercise: false
  };

  if (!weeklyRecord)
    return response;

  for (let i in response) {
    if (weeklyRecord[i])
      response[i] = true;
  }

  return response;
};

const checkDaily = async userId => {
  const day = getToday();
  let dailyRecord = await Daily.findOne({ userId, day });
  let response = {
    das: false,
    environment: false,
    symptom: false,
    msu: false
  };

  if (!dailyRecord)
    return response;

  for (let i in response) {
    if (dailyRecord[i])
      response[i] = true;
  }

  return response;
};



module.exports = {
  createRecord,
  addToDaily,
  addToWeekly,
  checkWeekly,
  checkDaily
};
