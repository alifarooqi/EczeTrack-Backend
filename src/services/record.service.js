const httpStatus = require('http-status');
const { Das, Env, Exercise, Msu, Sleep, Stress, Symptom, Daily, Weekly } = require('../models');
const { QualityOfLifeOT, SymptomOT, StressOT, Onetime } = require('../models');
const ApiError = require('../utils/ApiError');
const { getToday } = require('./common.service');

const models = {
  das: Das,
  environment: Env,
  exercise: Exercise,
  msu: Msu,
  sleep: Sleep,
  stress: Stress,
  symptom: Symptom,
  symptomOT: SymptomOT,
  qualityOfLifeOT: QualityOfLifeOT,
  stressOT: StressOT
};

const createRecord = async (recordModel, data) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }
  return await models[recordModel].create(data);
};

const updateRecord = async (recordId, recordModel, data) => {
  let record = await models[recordModel].findOneAndUpdate({_id: recordId}, data);
  
  if (!record)
    throw new ApiError(httpStatus.BAD_REQUEST, 'No such record exists with ID=' + recordId + ' in model ' + recordModel);
};

const entryExistsForTheDay = async (userId, recordModel) => {
  if (!models.hasOwnProperty(recordModel))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');

  const today = getToday();

  let dailyRecord = await Daily.findOne({ userId, day: today });

  if (dailyRecord && dailyRecord[recordModel]) return dailyRecord[recordModel];

  return false;
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
      update[recordModel] = [recordId];
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
  update[recordModel] = recordId;

  if (weeklyRecord) {
    await Weekly.updateOne({ _id: weeklyRecord.id }, update);
  }
  else {
    update.userId = userId;
    update.week = week;
    await Weekly.create(update);
  }
};

const addToOneTime = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  let onetimeRecord = await Onetime.findOne({ userId });

  let update = {};
  update[recordModel] = recordId;

  if (onetimeRecord) {
    await Onetime.updateOne({ _id: onetimeRecord._id },
      {
        $push: update
      }
    );
  } else {
    update.userId = userId;
    await Onetime.create(update);
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


const checkOneTime = async (userId) => {
  let onetimeRecord = await Onetime.findOne({ userId });

  let response = {
    environmentOT: 0,
    symptomOT: 0,
    stressOT: 0,
    qualityOfLifeOT: 0
  };

  if (!onetimeRecord)
    return response;

  for (let i in response) {
    response[i] = onetimeRecord[i].length;
  }

  response.environmentOT = -1;

  return response
};

module.exports = {
  createRecord,
  updateRecord,
  entryExistsForTheDay,
  addToDaily,
  addToWeekly,
  checkWeekly,
  checkDaily,
  addToOneTime,
  checkOneTime
};
