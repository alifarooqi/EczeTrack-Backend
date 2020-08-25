const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');


const weeklySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    symptom: mongoose.SchemaTypes.ObjectId,
    msu: mongoose.SchemaTypes.ObjectId,
    das: mongoose.SchemaTypes.ObjectId,
    environment: mongoose.SchemaTypes.ObjectId,
    weekFrom: mongoose.SchemaTypes.Date,
    weekUntil: mongoose.SchemaTypes.Date
  },
  {
    timestamps: true
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
