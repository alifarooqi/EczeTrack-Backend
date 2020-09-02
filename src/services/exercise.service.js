const httpStatus = require('http-status');
const { Exercise, Weekly } = require('../models');
const ApiError = require('../utils/ApiError');

const {ObjectId} = require('mongoose').Types;

const calculate = (exercise) =>{
  let score = 0;
  for(let q=0; q<7; q++){
    if(q%2 === 0){
      score += exercise[q] * 24*60;
    }
    else
      score += exercise[q];
  }
  return score;
};

const getData = async (dateFrom, dateTo, userId) => {
  let all_rows = await Weekly.find({
    userId: ObjectId(userId),
    createdAt: {
      $gte: dateFrom,
      $lt: dateTo
    }
  });

  let ids = new Array(all_rows.length);
  for (let i=0; i< all_rows.length; i++){
    ids[i] = all_rows[i].exercise;
  }

  let exercise = await Exercise.find().where('_id').in(ids).exec();

  let weeks = (new Array(all_rows.length)).fill(0);
  let data = (new Array(all_rows.length)).fill(0);
  let legend = ['Exercise'];

  for (let i=0; i< all_rows.length; i++){
    weeks[i] = all_rows[i].week;
    data[i] = calculate(exercise[i]);
  }
  data = [data]; // Converting it into 2D Array for the charts.

  return {weeks, data, legend};
};

module.exports = {
  getData
};
