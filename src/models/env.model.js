const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const envSchema = mongoose.Schema(
  {
    smoke: Boolean,
    air_pollution: Boolean,
    fumes_or_car_exhaust: Boolean,
    strong_odours_or_perfume: Boolean,
    soaps: Boolean,
    detergent: Boolean,
    fabric: {
      value: Boolean,
      other: {
        type: String,
        default: null,
        required: false,
      },
    },
    tight_clothing: Boolean,
    cosmetics: Boolean,
    air_conditioning: Boolean,
    cold_air: Boolean,
    rapid_temperature_change: Boolean,
    humid_day: Boolean,
    heat: Boolean,
    sun: Boolean,
    grass: Boolean,
    dust_or_vacuuming: Boolean,
    damp_or_musty_area: Boolean,
    animals: {
      value: Boolean,
      other: {
        type: String,
        default: null,
        required: false,
      },
    },
    mold: Boolean,
    pollen: Boolean,
    parks: Boolean,
    garden: Boolean,
    daycare: Boolean,
    home: Boolean,
    school: Boolean,
    work: Boolean,
    any_other_unusual_locations: {
      value: Boolean,
      other: {
        type: String,
        default: null,
        required: false,
      },
    },
    foreign_travel: Boolean,
    others: {
      value: Boolean,
      other: {
        type: String,
        default: null,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
envSchema.plugin(toJSON);
envSchema.plugin(paginate);

/**
 * @typedef Environment
 */
const Environment = mongoose.model('ENV', envSchema);

module.exports = Environment;
