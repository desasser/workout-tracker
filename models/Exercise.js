const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  type: String, // cardio, strength, flex, etc
  weight: {type: Number, default: null},
  sets: Number,
  reps: Number,
  duration: Number,
  distance: {type: Number, default: 0}
});

// if cardio, add distance key

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
