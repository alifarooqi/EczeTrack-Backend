const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, recordService } = require('../services');

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
  console.log("Received request to record:", data, userId, recordModel);
  if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid UserId  not found');
  if (!data) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Data  not found');

  const user = await getUser(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid User  not found');

  const record = await recordService.createRecord(recordModel, data);

  console.log("Recorded:", record);
  if(DAILY.includes(recordModel))
    await recordService.addToDaily(recordModel, user.id, record._id);
  else
    await recordService.addToWeekly(recordModel, user.id, record._id);

  res.status(httpStatus.CREATED).send({success: true, recordAdded: recordModel});
});

module.exports = {
  record
};
