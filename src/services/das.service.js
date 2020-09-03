const httpStatus = require('http-status');
const { Das, Daily } = require('../models');
const ApiError = require('../utils/ApiError');

const { getFactorFromRange, formatDay } = require('./common.service');

const getDasFromRange = async (dateFrom, dateTo, userId, factor) => {
  let all_rows = await Daily.find({
    userId: ObjectId(userId),
    day: {
      $gte: dateFrom,
      $lt: dateTo
    }
  });


  let ids = [];
  let dates = [];

  for (let i = 0; i < all_rows.length; i++) {
    let entry = all_rows[i][factor];
    if (entry) {
      ids.push(entry);
      dates.push(all_rows[i].day ? all_rows[i].day : all_rows[i].week);
    }
  }

  let data = [];

  for (let i = 0; i < ids.length; i++) {
    const dailyData = await models[factor].find().where('_id').in(ids[i]).exec();
    data.push(dailyData);
  }

  return { data, dates };
};

const getData = async (dateFrom, dateTo, userId) => {
  let { data: das, dates } = await getFactorFromRange(dateFrom, dateTo, userId, 'msu');

  let data = [(new Array(dates.length)).fill(0)];
  let legend = ['Diet Adherence Score'];

  for (let i = 0; i < dates.length; i++) {
    dates[i] = formatDay(dates[i]);
    data[0][i] = calculate(das[i]);
  }

  return { dates, data, legend };
};

const calculate = (das) => {
  // Das array of DAS Schema Model for one day
}

module.exports = {
  getData
}