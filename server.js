const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

// Is this necessary?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Workout routes
const workoutRoutes = require("./controllers/workoutController.js");
app.use(workoutRoutes)

// Exercise routes
const exerciseRoutes = require("./controllers/exerciseController.js");
app.use(exerciseRoutes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
