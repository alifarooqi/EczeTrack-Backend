const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {ObjectId} = require('mongoose').Types;
const catchAsync = require('../utils/catchAsync');
const {
  Das,
  Env,
  Exercise,
  Msu,

  Symptom,
  Sleep,
  Stress,

  StressOT,
  SymptomOT,
  QualityOfLifeOT,

  Daily,
  Weekly,
  Onetime,

} = require('../models');
const ObjectsToCsv = require('objects-to-csv');


const models = {
  symptom: Symptom,
  msu: Msu,
  das: Das,
  environment: Env,

  exercise: Exercise,
  stress: Stress,
  sleep: Sleep,

  stressOT: StressOT,
  symptomOT: SymptomOT,
  qualityOfLifeOT: QualityOfLifeOT,

  Daily,
  Weekly,
  Onetime
};

const {userService} = require('../services');

const login = catchAsync((req, res) => {
  const {username, password} = req.body;
  const {ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Admin username and password not set');

  if (!username || !password)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username or password missing');

  if (username !==  ADMIN_USERNAME || password !== ADMIN_PASSWORD)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');

  res.status(httpStatus.OK).send({ status: true });
});

const getData = catchAsync(async (req, res) => {
  let { email, selection } = req.body;

  if (!email || !selection)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Enter email and selection');

  if(!(selection in models))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid selection');

  const user = await userService.getUserByEmail(email);
  if (!user)
    throw new ApiError(httpStatus.BAD_REQUEST, 'User with this email not found');

  let selectionIDs = [];
  let selectionType = 'Daily';

  if(selection in ['exercise', 'sleep', 'stress'])
    selectionType = 'Weekly';
  else if(selection.slice(-2) === "OT")
    selectionType = 'Onetime';


  const allRecords = await models[selectionType].find({userId: ObjectId(user.id)});

  allRecords.forEach( record => {
    if(record[selection]){
      if(Array.isArray(record[selection]) && record[selection].length > 0){
        selectionIDs = selectionIDs.concat(record[selection]);
      }
      else{
        selectionIDs.push(record[selection]);
      }
    }
  });


  if (selectionIDs.length===0)
    throw new ApiError(httpStatus.NOT_FOUND, selection+  ' record for this user is not found');

  const all_data = await models[selection].find().where('_id').in(selectionIDs).exec();
  const data = filterData(all_data);
  const csv = new ObjectsToCsv(data);
  const filename = 'eczetrack_'+selection+'_'+user.name+'.csv';
  await csv.toDisk(filename);
  const csvData = await csv.toString();
  const response = {data: csvData, filename};

  res.status(200).send(response);
});


const filterData = data => {
  let newData = [];
  for (let i=0; i<data.length; i++){
    let row = {...data[i]['_doc']};
    console.log("Row:", row);
    for(let col of ['_id', 'updatedAt', '__v']){
      if(row[col]) {
        console.log("Deleting", col, "in row", i+1);
        delete row[col];
      }
    }
    row['createdAt'] = row['createdAt'].toString();
    newData.push(row);
  }
  console.log(newData);

  return newData
};

module.exports = {
  login,
  getData
};
