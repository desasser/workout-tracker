const express = require("express");
const router = express.Router();
const db = require('../models')

router.post("/newWorkout", (req,res) => {
  db.Workout.create(req.body)
    .then(dbWorkout => {
      console.log(dbWorkout);
    }).catch(err => {
      console.log(err);
    })
})

router.get("/workout", (req,res) => {
  db.Workout.find().then(dbWorkout => {
    res.json(dbWorkout)
  }).catch(err => {
    res.json(err)
  })
})



module.exports = router;