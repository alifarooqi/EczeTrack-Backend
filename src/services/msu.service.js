const { getFactorFromRange, formatDay } = require('./common.service');

const getData = async (dateFrom, dateTo, userId) => {
  let { data: msus, data: all_rows } = await getFactorFromRange(dateFrom, dateTo, userId, 'msu');

  let days = (new Array(all_rows.length)).fill(0);
  let data = [(new Array(all_rows.length)).fill(0), (new Array(all_rows.length)).fill(0)];
  let legend = ['Steroid Use', 'Moisturizer Use'];

  for (let i = 0; i < all_rows.length; i++) {
    days[i] = formatDay(all_rows[i].createdAt);
    data[0][i] = msus.steroidUse;
    data[1][i] = msus.moisturizerUse;
  }

  return {days, data, legend};
};

module.exports = {
  getData
};
