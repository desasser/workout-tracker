const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  type: String,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  isCardio: Boolean,
  distance: Number
});

// if cardio, add distance key

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
