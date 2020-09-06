const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, recordService } = require('../services');
const { entryExistsForTheDay } = require('../services/record.service');

const getUser = async (userId) => {
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'User ID  not found');

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const DAILY = ['das', 'environment', 'symptom', 'msu'];
const WEEKLY = ['sleep', 'stress', 'exercise'];

const record = catchAsync(async (req, res) => {
  const { data, userId, recordModel } = req.body;
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid UserId  not found');
  if (!data) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Data  not found');

  const user = await getUser(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User  not found');

  if (recordModel == 'symptom'){
    symptomId = await recordService.entryExistsForTheDay(userId, recordModel);

    if (symptomId){
      await recordService.updateRecord(symptomId, recordModel, data);
      return res.status(httpStatus.CREATED).send({success: true, recordUpdated: recordModel});
    }
  }

  const record = await recordService.createRecord(recordModel, data);

  if(DAILY.includes(recordModel)) {
    await recordService.addToDaily(recordModel, user.id, record._id);
  } else if (recordModel.slice(-2) === "OT") {
    await recordService.addToOneTime(recordModel, user.id, record._id)
  } else {
    await recordService.addToWeekly(recordModel, user.id, record._id);
  }

  res.status(httpStatus.CREATED).send({success: true, recordAdded: recordModel});
});


const checkWeekly = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const weeklyCheck = await recordService.checkWeekly(userId);
  res.status(httpStatus.OK).send({success: true, weeklyCheck});
});

const checkDaily = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const dailyCheck = await recordService.checkDaily(userId);
  res.status(httpStatus.OK).send({success: true, dailyCheck});
});

const checkOneTime = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const otCheck = await recordService.checkOneTime(userId);
  res.status(httpStatus.OK).send({success: true, otCheck});
});

module.exports = {
  record,
  checkWeekly,
  checkDaily,
  checkOneTime
};
