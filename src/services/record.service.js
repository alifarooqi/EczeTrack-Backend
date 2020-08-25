const httpStatus = require('http-status');
const {
  Das,
  Env,
  Exercise,
  Msu,
  Sleep,
  Stress,
  Symptom,
  Daily,
  Weekly
} = require('../models');
const ApiError = require('../utils/ApiError');

const models = {
  Das,
  Env,
  Exercise,
  Msu,
  Sleep,
  Stress,
  Symptom
};


const createRecord = async (recordModel, data) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const rec = await models[recordModel].create(data);
  console.log('Record created for', recordModel, rec);
  return rec._id;
};


const addToDaily = async (recordModel, userId, recordId) => {
  if (!models.hasOwnProperty(recordModel)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Model Request');
  }

  const rec = await models[recordModel].create(data);
  console.log('Record created for', recordModel, rec);
  return rec._id;
};


module.exports = {
  createRecord,
  addToDaily
};
