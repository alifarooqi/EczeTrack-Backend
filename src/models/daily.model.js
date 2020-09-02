const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dailySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    symptom: mongoose.SchemaTypes.ObjectId,
    msu: mongoose.SchemaTypes.ObjectId,
    das: [ mongoose.SchemaTypes.ObjectId ],
    environment: mongoose.SchemaTypes.ObjectId,
    day: mongoose.SchemaTypes.Date,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dailySchema.plugin(toJSON);
dailySchema.plugin(paginate);

/**
 * @typedef DAS
 */
const Daily = mongoose.model('daily', dailySchema);

module.exports = Daily;
