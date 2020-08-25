const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const msuSchema = mongoose.Schema(
  {
    steroid: String,
    steroidUse: Number,
    moisturizer: String,
    moisturizerUse: Number,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
msuSchema.plugin(toJSON);
msuSchema.plugin(paginate);

/**
 * @typedef MSU
 */
const MSU = mongoose.model('MSU', msuSchema);

module.exports = MSU;
