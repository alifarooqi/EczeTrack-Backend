const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


let schema = {};
for(let i=0; i<17; i++){
  schema[i] = {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  }
}

const stressOTSchema = mongoose.Schema(schema,
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stressOTSchema.plugin(toJSON);
stressOTSchema.plugin(paginate);

/**
 * @typedef Stress
 */
const StressOT = mongoose.model('stressOT', stressOTSchema);

module.exports = StressOT;
