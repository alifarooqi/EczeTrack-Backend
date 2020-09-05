const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const symptomOTSchema = mongoose.Schema(
  {
    0: {
      type: Number,
      default: 0,
    },
    1: {
      type: Number,
      default: 0,
    },
    2: {
      type: Number,
      default: 0,
    },
    3: {
      type: Number,
      default: 0,
    },
    4: {
      type: Number,
      default: 0,
    },
    5: {
      type: Number,
      default: 0,
    },
    6: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
symptomOTSchema.plugin(toJSON);
symptomOTSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const SymptomOT = mongoose.model('symptomOT', symptomOTSchema);

module.exports = SymptomOT;
