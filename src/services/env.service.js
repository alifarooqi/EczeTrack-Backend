const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let { data: env, dates } = await getFactorFromRange(dateFrom, dateTo, userId, 'environment');

  let days = (new Array(dates.length)).fill(0);
  let data = [(new Array(dates.length)).fill(0)];
  let legend = ['Environment'];

  for (let i = 0; i < dates.length; i++) {
    days[i] = formatDay(dates[i]);
    data[0][i] = calculate(env[i]);
  }

  return { days, data, legend };
};

const calculate = (env) => {
  let score = 0;
  const envJSON = env.toJSON();
  delete envJSON.id;

  for (entry in envJSON){
    if (typeof(envJSON[entry]) === "boolean"){
      score += envJSON[entry] ? 1 : 0;
    } else {
      score += envJSON[entry].value ? 1 : 0;
    }
  }

  return score
}

module.exports = {
  getData
}