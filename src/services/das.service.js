const httpStatus = require('http-status');
const { Das, Daily } = require('../models');
const {ObjectId} = require('mongoose').Types;
const { foodSubcategoryScoring, foodClass } = require('../data/foodClass');
const foodDescToClass = require('../data/food_desc_to_class.json');

const { formatDay, getToday } = require('./common.service');

const getDasFromRange = async (dateFrom, dateTo, userId) => {
  let all_rows = await Daily.find({
    userId: ObjectId(userId),
    day: {
      $gte: dateFrom,
      $lte: dateTo
    }
  });

  let ids = [];
  let dates = [];

  all_rows.forEach((item, index) => {
    if (Array.isArray(item['das']) && item['das'].length){
      ids.push(item['das']);
      dates.push(item['day']);
    }
  });

  let data = [];

  for (let i = 0; i < ids.length; i++) {
    const dailyData = await Das.find().where('_id').in(ids[i]).exec();
    data.push(dailyData);
  }

  return { data, dates };
};

const getData = async (dateFrom, dateTo, userId) => {
  let { data: das, dates } = await getDasFromRange(dateFrom, dateTo, userId);

  let data = [(new Array(dates.length)).fill(0)];
  let legend = ['Diet Adherence Score'];

  for (let i = 0; i < dates.length; i++) {
    dates[i] = formatDay(dates[i]);
    data[0][i] = calculate(das[i]) < 0 ? 0 : calculate(das[i]);
  }

  return { dates, data, legend };
};

const calculate = (das) => {
  // Das array of DAS Schema Model for one day
  const foodSubcategories = getFoodSubcategoriesFromFoodItems(das);
  
  let score = calculateScoreFromSubcategories(foodSubcategories);

  return score;
};

const getFoodSubcategoriesFromFoodItems = (foodItems) => {
  let foodSubcategories = {};
  for (let i=0; i<foodItems.length; i++){
    const item = foodItems[i].toJSON();
    const itemFoodClasses = foodDescToClass[item.foodItem];

    for (itemFoodClass in itemFoodClasses){
      const foodSubcategory = foodClass[itemFoodClass].subcategory;

      if(foodSubcategory && foodSubcategory != "Snacking"){
        const subcategoryAmt = itemFoodClasses[itemFoodClass] * item.foodItemAmt;

        if (foodSubcategories[foodSubcategory]){
          foodSubcategories[foodSubcategory] += subcategoryAmt;
        } else {
          foodSubcategories[foodSubcategory] = subcategoryAmt;
        }
      }
    }

    if (item.mealType === "Snack"){
      if (foodSubcategories["Snacking"]){
        foodSubcategories["Snacking"] += 1;
      } else {
        foodSubcategories["Snacking"] = 1;
      }
    }
  }
  
  return foodSubcategories;
};

const calculateScoreFromSubcategories = (subcategories) => {
  let score = 0;

  console.log(subcategories);
  for (subcategory in subcategories) {
    let amount = subcategories[subcategory];
    const rubric = foodSubcategoryScoring[subcategory]
    
    if (subcategory === "Snacking") {
      if (amount > -rubric.max_score){
        score += rubric.max_score;
      } else {
        score -= amount
      }
    } else if (subcategory === "Colorful Fruits and Vegetables") {
      if (amount > rubric.max_score){
        score += rubric.max_score;
      } else {
        score += amount;
      }
    } else if (subcategory === "Sodium") {
      if (amount > rubric.lower_bound) {
        score += rubric.rubric;
      }
    } else {
      if (rubric.lower_bound){
        amount -= rubric.lower_bound;
        if (amount <= 0){
          continue;
        }
      }

      let remainder = parseInt(amount / rubric.per);
      const condition = (rubric.max_score < 0) ? -rubric.rubric * remainder >= -rubric.max_score : rubric.rubric * remainder >= rubric.max_score;
      if (condition) {
        score += rubric.max_score;
      } else {
        score += rubric.rubric * remainder;
      }
    }
  }
  console.log(score);
  return score
};

const getDayDAS = async (userId) => {
  const today = getToday();

  console.log('today', today);
  dailyRecord = await Daily.findOne({ userId, day: today });
  console.log('daily record: ', dailyRecord);

  if (dailyRecord && dailyRecord.das.length > 0){
    const dasIds = dailyRecord.das
    console.log(dasIds);

    const dayDas = await Das.find().where('_id').in(dasIds).exec();
    console.log(dayDas);
    return dayDas;
  }
  return [];
}

module.exports = {
  getData,
  getDayDAS
}