const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let { data: msus, dates } = await getFactorFromRange(dateFrom, dateTo, userId, 'msu');

  let data = [(new Array(dates.length)).fill(0), (new Array(dates.length)).fill(0)];
  let legend = ['Steroid', 'Moisturizer'];

  for (let i = 0; i < dates.length; i++) {
    dates[i] = formatDay(dates[i]);
    data[0][i] = msus[i].steroidUse < 0 ? 0 : msus[i].steroidUse;
    data[1][i] = msus[i].moisturizerUse < 0 ? 0 : msus[i].moisturizerUse;
  }

  return { dates, data, legend };
};

module.exports = {
  getData
};
