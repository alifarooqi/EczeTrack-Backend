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
      day: {
        $gte: dateFrom,
        $lte: dateTo
      }
    });
  } else {
    all_rows = await Weekly.find({
      userId: ObjectId(userId),
      createdAt: {
        $gte: dateFrom,
        $lte: new Date()
      }
    });
  }

  console.log(await Weekly.find());
  console.log('fatefrom')
  console.log('All rows: ', all_rows);

  let ids = [];
  let dates = [];
  
  for (let i=0; i< all_rows.length; i++){
    let entry = all_rows[i][factor];
    if (entry){
      ids.push(entry);
      dates.push(all_rows[i].day ? all_rows[i].day : all_rows[i].createdAt);
    }
  }

  const data = await models[factor].find().where('_id').in(ids).exec();

  return {data, dates};
};

const formatDay = (day) => { //dd-mm 
  let dateStr = "";
  dateStr += day.getMonth() + 1;
  dateStr += "-";
  dateStr += day.getDate(); //TODO: Add padding??
  return dateStr;
};

const getToday = () => {
  const d = new Date();
  return new Date(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' 8:00:000');
};

module.exports = {
  getFactorFromRange,
  formatDay,
  getToday
}
