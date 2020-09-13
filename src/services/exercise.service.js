const { getFactorFromRange } = require('./common.service');

const calculate = (exercise) =>{
  let score = 0;
  for(let q=0; q<7; q++){
    if(q%2 === 0){
      score += exercise[q] * 24*60;
    }
    else
      score += exercise[q];
  }
  return score;
};

const getData = async (dateFrom, dateTo, userId) => {
  let {data: exercise, dates} = await getFactorFromRange(dateFrom, dateTo, userId, 'exercise');

  let data = (new Array(exercise.length)).fill(0);
  let legend = ['Exercise'];

  for (let i=0; i< exercise.length; i++){
    dates[i] = formatDay(dates[i]);
    data[i] = calculate(exercise[i]) < -1 ? 0 : calculate(exercise[i]);
  }
  data = [data]; // Converting it into 2D Array for the charts.

  return {dates, data, legend};
};

module.exports = {
  getData
};
