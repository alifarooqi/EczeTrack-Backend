const bodyPercent = require('../data/bodyPercent');

const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let {data: symptoms, dates} = await getFactorFromRange(dateFrom, dateTo, userId, 'symptom');

  let days = (new Array(dates.length)).fill(0);
  let data = [(new Array(dates.length)).fill(0)];
  let legend = ['Symptoms'];

  for (let i=0; i< dates.length; i++){
      days[i] = formatDay(dates[i]);
      data[0][i] = calculate(symptoms[i]);
  }

  return {days, data, legend};
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
