const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sleepSchema = mongoose.Schema(
  {
    0: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    1: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    2: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    3: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    4: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    5: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sleepSchema.plugin(toJSON);
sleepSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
