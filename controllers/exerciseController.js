const express = require("express");
const router = express.Router();
const db = require('../models')

router.post("/submit", (req,res) => {
  db.Excercise.create(req.body)
})

router.get("/workout", (req,res) => {
  db.Workout.find().then(dbWorkout => {
    res.json(dbWorkout)
  }).catch(err => {
    res.json(err)
  })
})

module.exports = router;