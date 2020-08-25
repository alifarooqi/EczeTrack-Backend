const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService , recordService} = require('../services');


const getUser = async (userId) => {
  if(!userId)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID  not found');

  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};


const recordSymptoms = catchAsync(async (req, res) => {
  const user = await getUser(req.body.userId);

  const data = req.body.data;
  if(!data)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Data  not found');

  //TODO Validate Data




  res.status(httpStatus.CREATED).send(user);
});

const recordMSU = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const recordDAS = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const recordEnv = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const recordExercise = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const recordStress = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const recordSleep = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});


module.exports = {
  recordSymptoms,
  recordMSU,
  recordDAS,
  recordEnv,
  recordExercise,
  recordStress,
  recordSleep
};
