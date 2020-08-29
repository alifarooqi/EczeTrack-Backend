const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const bodyPercent = require('../data/bodyPercent');

const getSchema = () => {
  const schema = {};
  for (const bodyPart in bodyPercent) {
    schema[bodyPart] = {
      q1: Number,
      q2: Number,
      q3: Number,
      q4: Number,
      q5: Number,
      q6: Number,
    };
    for (const q of ['front', 'back', 'bilateral']) {
      if (bodyPercent[bodyPart][q]) schema[bodyPart][q] = Boolean;
    }
  }
  return schema;
};

const symptomSchema = mongoose.Schema(getSchema(), { timestamps: true });

// add plugin that converts mongoose to json
symptomSchema.plugin(toJSON);
symptomSchema.plugin(paginate);

/**
 * @typedef Symptom
 */
const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
