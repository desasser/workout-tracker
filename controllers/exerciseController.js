const express = require("express");
const router = express.Router();
const db = require('../models')

router.post("/submit", (req,res) => {
  db.Excercise.create(req.body)
})


module.exports = router;