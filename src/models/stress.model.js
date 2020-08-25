const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const stressSchema = mongoose.Schema(
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
    6: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    7: {
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
stressSchema.plugin(toJSON);
stressSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const Stress = mongoose.model('Stress', stressSchema);

module.exports = Stress;
