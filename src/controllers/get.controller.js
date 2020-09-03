const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const foodDescClassObject = require('../data/food_desc_to_class.json');
const { 
  symptomService,
  msuService,
  dasService,
  envService,
  exerciseService,
  stressService,
  sleepService
} = require('../services');

const services = {
  symptom: symptomService,
  msu: msuService,
  das: dasService,
  environment: envService,
  exercise: exerciseService,
  stress: stressService,
  sleep: sleepService
};

const foodList = (req, res) => {
  res.status(httpStatus.OK).send({ data: Object.keys(foodDescClassObject) });
};

const getChartData = catchAsync(async (req, res) => {
  let { userId, dateFrom, dateTo, factor } = req.body;
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid UserId not found');

  dateTo = new Date(dateTo);
  dateFrom = new Date(dateFrom);

  const chartData = await services[factor].getData(dateFrom, dateTo, userId);
  res.status(httpStatus.OK).send({ factor, chartData });
});

module.exports = {
  foodList,
  getChartData
};
