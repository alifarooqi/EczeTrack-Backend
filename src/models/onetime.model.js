const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const onetimeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    environmentOT: [mongoose.SchemaTypes.ObjectId],
    symptomOT: [mongoose.SchemaTypes.ObjectId],
    stressOT: [mongoose.SchemaTypes.ObjectId],
    qualityOfLifeOT: [mongoose.SchemaTypes.ObjectId]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
onetimeSchema.plugin(toJSON);
onetimeSchema.plugin(paginate);

/**
 * @typedef DAS
 */
const Onetime = mongoose.model('onetime', onetimeSchema);

module.exports = Onetime;
