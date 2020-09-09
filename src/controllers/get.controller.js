const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const foodDescClassObject = require('../data/food_desc_to_class.json');
const { getToday } = require('../services/common.service');
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

  dateTo = getToday();
  dateFrom = new Date(dateFrom);

  const chartData = await services[factor].getData(dateFrom, dateTo, userId);
  res.status(httpStatus.OK).send({ factor, chartData });
});

const getDaySymptoms = async (req, res) => {
  let { userId } = req.body;
  let symptom = (await symptomService.getDaySymptoms(userId));
  delete symptom['id'];

  res.status(httpStatus.OK).send({ symptom });
};

const getDayDAS = async (req, res) => {
  let { userId } = req.body;
  let das = await dasService.getDayDAS(userId);

  das = das.map((item) => {
    item = item.toJSON();
    delete item['id'];
    return item;
  });

  res.status(httpStatus.OK).send({ das });
}

module.exports = {
  foodList,
  getChartData,
  getDaySymptoms,
  getDayDAS
};
