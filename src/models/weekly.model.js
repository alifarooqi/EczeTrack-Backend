const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const weeklySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    exercise: mongoose.SchemaTypes.ObjectId,
    stress: mongoose.SchemaTypes.ObjectId,
    sleep: mongoose.SchemaTypes.ObjectId,
    week: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
weeklySchema.plugin(toJSON);
weeklySchema.plugin(paginate);

/**
 * @typedef DAS
 */
const Weekly = mongoose.model('weekly', weeklySchema);

module.exports = Weekly;
