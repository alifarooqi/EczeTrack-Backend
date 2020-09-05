const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const envOTSchema = mongoose.Schema(
  {
    current_occuptation: String,
    time_at_present_location: Number,
    location: String,
    air_conditioning: String,
    floor_bedroom: String,
    floor_family_room: String,
    mattress: String,
    pillow: String,
    comforter: String,
    zippered_dust_mite_allergy_cover: {
      value: Boolean,
      itemCovered: String
    },
    any_pets: {
      value: Boolean,
      pets: String
    },
    mold_mildew_problem: {
      value: Boolean,
      severity: String,
      place: String
    },
    symptoms: String,
    months: String,
    main_problem: String,
    body_parts_affected: String,
    symptoms_first_began: String,
    last_outbreak: String,
    avg_outbreak_lasting: String,
    outbreak_frequency: String,
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
envOTSchema.plugin(toJSON);
envOTSchema.plugin(paginate);

/**
 * @typedef Environment2F
 */
const EnvironmentOT = mongoose.model('envOT', envOTSchema);

module.exports = EnvironmentOT;
