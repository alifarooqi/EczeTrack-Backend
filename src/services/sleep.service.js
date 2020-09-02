const { getFactorFromRange } = require('./common.service');

const calculate = (sleep) =>{
  let score = 0;
  for(let q=0; q<5; q++)
    score += sleep[q];

  return score;
};

const getData = async (dateFrom, dateTo, userId) => {
  let {data: sleep, all_rows} = await getFactorFromRange(dateFrom, dateTo, userId, 'sleep');

  let weeks = (new Array(sleep.length)).fill(0);
  let data = (new Array(sleep.length)).fill(0);
  let legend = ['Sleep'];

  for (let i=0; i< sleep.length; i++){
    weeks[i] = all_rows[i].week;
    data[i] = calculate(sleep[i]);
  }
  data = [data]; // Converting it into 2D Array for the charts.

  return {weeks, data, legend};
};

module.exports = {
  getData
};
