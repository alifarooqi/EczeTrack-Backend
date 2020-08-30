const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const foodDescClassObject = require('../data/food_desc_to_class.json');

const foodList = (req, res) => {
  res.status(httpStatus.OK).send({data: Object.keys(foodDescClassObject)});
}

module.exports = {
  foodList
}