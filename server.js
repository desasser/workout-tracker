const express = require("express");
const logger = require("morgan");
const path = require('path')
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

const handlebars = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));

const db = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});


// ================================================================================
// ROUTER
// ================================================================================

app.get('/', (req, res) => {
  res.render('index')
})

// RENDER: NEW WORKOUT
app.get('/newworkout', (req, res) => {
  res.render('newWorkout')
})

// RENDER: NEW EXERCISE
app.get('/newexercise', (req, res) => {
  db.Workout.find().sort({ _id: -1 }).limit(8).lean().then(workoutsData => {
    // console.log(workoutsData);
    const hbsObj = {
      workout: workoutsData
    }
    console.log(hbsObj);
    res.render('newExercise', hbsObj)
  })
})

// RENDER: ALL WORKOUTS
app.get('/workouts', (req, res) => {
  db.Workout.find().sort({ _id: -1 }).limit(8).lean().then(workoutsData => {
    // console.log('raw data', workoutsData);
    const hbsObj = {
      workout: workoutsData
    }
    // console.log('fixed data', hbsObj);
    res.render('allWorkouts', hbsObj)
  })
})

// RENDER: SPECIFIC WORKOUT
app.get('/activeworkout/:id', (req, res) => {
  // console.log('hello');
  db.Workout.find({ _id: req.params.id})
    .populate('exercises').lean()
    .then(workoutDb => {
      // console.log(workoutDb[0].exercises);
      // res.json(workoutDb[0].exercises)
      const hbsObj = {
        exercise: workoutDb[0].exercises
      }
      res.render('activeWorkout', hbsObj)
      // res.json(workoutDb)
    }).catch(err => {
      console.log(err);
      res.send(err);
    })
})

//SEE ALL EXERCISES
app.get('/api/exercises', (req, res) => {
  db.Exercise.find().then(exerciseDb => {
    res.json(exerciseDb)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})

//SEE ALL WORKOUTS
app.get('/api/workouts', (req, res) => {
  db.Workout.find().then(workoutDb => {
    res.json(workoutDb)
  }).catch(err => {
    console.log(err);
    res.send(err);
  })
})

//SEE WORKOUT WITH EXERCISES
app.get('/populatedworkouts', (req, res) => {
  db.Workout.find()
    .populate('exercises')
    .then(workoutDb => {
      res.json(workoutDb)
    }).catch(err => {
      console.log(err);
      res.send(err);
    })
})


//CREATE NEW WORKOUT
app.post('/newworkout', ({ body }, res) => {
  db.Workout.create(body)
    .then(workoutDb => {
      res.redirect('/newexercise');
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
})

//CREATE NEW EXERCISE
app.post('/newexercise', (req, res) => {
  console.log(req.body.workoutId);

  db.Exercise.create({
    workoutId: req.body.workoutId,
    name: req.body.name,
    type: req.body.type,
    weight: req.body.weight,
    sets: req.body.sets,
    reps: req.body.reps,
    duration: req.body.duration,
    distance: req.body.distance
  })
    .then(exerciseDb => {
      db.Workout.findOneAndUpdate({ _id: req.body.workoutId }, { $push: { exercises: exerciseDb._id } })
        .then(workoutDb => {
          res.redirect('/newexercise')
        })
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
