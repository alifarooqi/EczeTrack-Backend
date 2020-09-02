const { Das, Env, Exercise, Msu, Sleep, Stress, Symptom, Daily, Weekly } = require('../models');
const {ObjectId} = require('mongoose').Types;

const models = {
  das: Das,
  environment: Env,
  exercise: Exercise,
  msu: Msu,
  sleep: Sleep,
  stress: Stress,
  symptom: Symptom,
};

const DAILY = ['das', 'environment', 'symptom', 'msu'];
const WEEKLY = ['sleep', 'stress', 'exercise'];

const getFactorFromRange = async (dateFrom, dateTo, userId, factor) => {
  let all_rows;

  if (DAILY.includes(factor)){
    all_rows = await Daily.find({
      userId: ObjectId(userId),
      createdAt: {
        $gte: dateFrom,
        $lt: dateTo
      }
    });
  } else {
    all_rows = await Weekly.find({
      userId: ObjectId(userId),
      createdAt: {
        $gte: dateFrom,
        $lt: dateTo
      }
    });
  }

  let ids = new Array(all_rows.length);
  for (let i=0; i< all_rows.length; i++){
    ids[i] = all_rows[i][factor];
  }

  return await models[factor].find().where('_id').in(ids).exec();
}

module.exports = {
  getFactorFromRange
}