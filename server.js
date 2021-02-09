const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const db = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


// ================================================================================
// ROUTER
// ================================================================================

app.get('/api/exercises', (req,res) => {
  db.Exercise.find().then(exerciseDb => {
    res.json(exerciseDb)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})

app.get('/api/workouts', (req,res) => {
  db.Workout.find().then(workoutDb => {
    res.json(workoutDb)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})

app.get('populatedworkouts', (req,res) => {
  db.Workout.find()
  .populate('exercises')
  .then(workoutDb => {
    res.json(workoutDb)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})

app.post('/api/workouts', ({ body }, res) => {
  db.Workout.create(body)
  .then(workoutDb => {
    res.json(workoutDb)
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

app.post('/api/exercises', (req,res) => {
  console.log(req.body);
  
  db.Exercise.create(req.body)
  .then(exerciseDb => {
    db.Workout.findOneAndUpdate({_id:req.body.workoutId}, {$push: {exercises: exerciseDb._id}})
    .then(workoutDb => res.send(workoutDb))
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

// =============================================================================
// LISTENER
// =============================================================================

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
