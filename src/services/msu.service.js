const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let { data: msus, dates } = await getFactorFromRange(dateFrom, dateTo, userId, 'msu');

  let days = (new Array(dates.length)).fill(0);
  let data = [(new Array(dates.length)).fill(0), (new Array(dates.length)).fill(0)];
  let legend = ['Steroid Use', 'Moisturizer Use'];

  for (let i = 0; i < dates.length; i++) {
    days[i] = formatDay(dates[i]);
    data[0][i] = msus[i].steroidUse;
    data[1][i] = msus[i].moisturizerUse;
  }

  return {days, data, legend};
};

module.exports = {
  getData
}