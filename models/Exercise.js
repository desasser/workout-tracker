const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  type: String,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  isCardio: Boolean
});

// if cardio, add distance key

const Exercise = mongoose.model("Note", ExerciseSchema);

module.exports = Exercise;
