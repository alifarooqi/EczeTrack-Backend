const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const qualityOfLifeOTSchema = mongoose.Schema(
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
    7: {
      type: Number,
      default: 0,
    },
    8: {
      type: Number,
      default: 0,
    },
    9: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
qualityOfLifeOTSchema.plugin(toJSON);
qualityOfLifeOTSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const QualityOfLifeOT = mongoose.model('qualityOfLifeOT', qualityOfLifeOTSchema);

module.exports = QualityOfLifeOT;
