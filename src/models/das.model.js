const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dasSchema = mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    },
    foodItem: mongoose.SchemaTypes.ObjectId,
    foodItemAmt: Number,
    foodItemAmtUnit: {
      type: String,
      enum: ['ml', 'g'],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dasSchema.plugin(toJSON);
dasSchema.plugin(paginate);

/**
 * @typedef DAS
 */
const DAS = mongoose.model('DAS', dasSchema);

module.exports = DAS;
