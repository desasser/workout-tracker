const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  type: String,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  isCardio: {type: Boolean, default: false},
  distance: {type: Number, default: 0}
});

// if cardio, add distance key

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
