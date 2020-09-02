const httpStatus = require('http-status');
const { Msu, Daily } = require('../models');
const ApiError = require('../utils/ApiError');

const getData = async(dateFrom, dateTo, userId) => {
  let all_rows = await Daily.find({
    userId: ObjectId(userId),
    createdAt: {
      $gte: dateFrom,
      $lt: dateTo
    }
  });

  let ids = new Array(all_rows.length);
  for (let i=0; i< all_rows.length; i++){
    ids[i] = all_rows[i].msu;
  }

  let msus = await Msu.find().where('_id').in(ids).exec();

  
};