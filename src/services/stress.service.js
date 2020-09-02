const { getFactorFromRange } = require('./common.service');

const calculate = (stress) =>{
  let score = 0;
  for(let q=0; q<8; q++)
    score += stress[q];

  return score;
};

const getData = async (dateFrom, dateTo, userId) => {
  let {data: stress, dates} = await getFactorFromRange(dateFrom, dateTo, userId, 'stress');

  let data = (new Array(stress.length)).fill(0);
  let legend = ['Stress'];

  for (let i=0; i< stress.length; i++){
    data[i] = calculate(stress[i]);
  }
  data = [data]; // Converting it into 2D Array for the charts.

  return {dates, data, legend};
};

module.exports = {
  getData
};
