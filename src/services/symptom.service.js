const bodyPercent = require('../data/bodyPercent');
const { Symptom, Daily } = require('../models');
const { getToday } = require('./common.service');

const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let {data: symptoms, dates} = await getFactorFromRange(dateFrom, dateTo, userId, 'symptom');

  let data = [(new Array(dates.length)).fill(0)];
  let legend = ['Symptoms'];

  for (let i=0; i< dates.length; i++){
      dates[i] = formatDay(dates[i]);
      data[0][i] = calculate(symptoms[i]);
  }

  return {dates, data, legend};
};

const calculate = (symptom) => {
  let score = 0;
  for (const bodyPart of Object.keys(bodyPercent)) {
    if (Object.keys(symptom[bodyPart]).length !== 0) {
      let multiplier = 0;

      for (const q of ['front', 'back', 'bilateral']) {
        if (symptom[bodyPart][q])
          multiplier += 1;
      }

      let rawScore = 0;

      for (let i = 1; i < 7; i++) {
        rawScore += symptom[bodyPart]["q" + i];
      }
      
      if(!isNaN(rawScore)){
        score += multiplier * bodyPercent[bodyPart].percent * rawScore;
      }
    }
  }

  return score;

};

const getDaySymptoms = async (userId) => {
  const today = getToday();

  dailyRecord = await Daily.findOne({ userId, day: today });

  if (dailyRecord && dailyRecord.symptom){
    symptom = await Symptom.findOne({_id: dailyRecord.symptom});
    return symptom.toJSON();
  }
  return {};
};

module.exports = {
  getData,
  getDaySymptoms
};
