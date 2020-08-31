const httpStatus = require('http-status');
const { Symptom, Daily } = require('../models');
const ApiError = require('../utils/ApiError');
const bodyPercent = require('../data/bodyPercent');

const getData = async (dateFrom, dateTo, userID) => {
  let all_rows = await Daily.find({
    userID, day: {
      $gte: ISODate(dateFrom),
      $lt: ISODate(dateTo)
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
      days[i] = formatDay(all_record[i].day);
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
  for (const bodyPart in symptom){
    let multiplier = 0;
    
    for (const q of ['front', 'back', 'bilateral']) {
      if (symptom[bodyPart][q]) 
        multiplier += 1;
    }

    let rawScore = 0;

    for (let i=1; i<7; i++) {
      rawScore += symptom[i];
    }

    score += multiplier * bodyPercent[bodyPart].percent * rawScore;
    console.log(bodyPart, multiplier, rawScore);
  }

  return score;

};