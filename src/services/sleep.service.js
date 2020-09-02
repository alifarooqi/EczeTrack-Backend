const { getFactorFromRange } = require('./common.service');

const calculate = (sleep) =>{
  let score = 0;
  for(let q=0; q<5; q++)
    score += sleep[q];

  return score;
};

const getData = async (dateFrom, dateTo, userId) => {
  let {data: sleep, dates} = await getFactorFromRange(dateFrom, dateTo, userId, 'sleep');

  let data = (new Array(sleep.length)).fill(0);
  let legend = ['Sleep'];

  for (let i=0; i< sleep.length; i++){
    data[i] = calculate(sleep[i]);
  }
  data = [data]; // Converting it into 2D Array for the charts.

  return {dates, data, legend};
};

module.exports = {
  getData
};
