const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  exercises: [
    {
      type:Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const Exercise = mongoose.model("Note", ExerciseSchema);

module.exports = Exercise;
