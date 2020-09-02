const httpStatus = require('http-status');
const { Symptom, Daily } = require('../models');
const ApiError = require('../utils/ApiError');
const bodyPercent = require('../data/bodyPercent');

const {ObjectId} = require('mongoose').Types;

const getData = async (dateFrom, dateTo, userId) => {
  let all_rows = await Daily.find({
    userId: ObjectId(userId),
    createdAt: {
      $gte: dateFrom,
      $lt: dateTo
    }
  });

  let ids = new Array(all_rows.length);
  for (let i=0; i< all_rows.length; i++){
    ids[i] = all_rows[i].symptom;
  }

  let symptoms = await Symptom.find().where('_id').in(ids).exec();

  let days = (new Array(all_rows.length)).fill(0);
  let data = (new Array(all_rows.length)).fill(0);

  for (let i=0; i< all_rows.length; i++){
      days[i] = formatDay(all_rows[i].createdAt);
      data[i] = calculate(symptoms[i]);
  }

  return {days, data};
};

const formatDay = (day) => { //dd-mm 
    let dateStr = "";
    dateStr += day.getDate(); //TODO: Add padding??
    dateStr += "-";
    dateStr += day.getMonth() + 1;
    return dateStr;
};

const calculate = (symptom) => {
  let score = 0;
  console.log(symptom);
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
        console.log(bodyPart, multiplier, bodyPercent[bodyPart].percent, rawScore, score);
      }
    }
  }

  return score;

};

module.exports = {
  getData
};
