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

const foodList = (req, res) => {
  res.status(httpStatus.OK).send({ data: Object.keys(foodDescClassObject) });
}

const symptoms = (req, res) => {

}

const msu = (req, res) => {

}

const das = (req, res) => {

}

const env = (req, res) => {

}

const exercise = (req, res) => {

}

const stress = (req, res) => {

}

const sleep = (req, res) => {

}

module.exports = {
  foodList,
  symptoms,
  msu,
  das,
  env,
  exercise,
  stress,
  sleep
}