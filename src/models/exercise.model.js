const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const exerciseSchema = mongoose.Schema(
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
exerciseSchema.plugin(toJSON);
exerciseSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
