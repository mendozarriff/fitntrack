const express = require('express');
const router = express.Router();
const moment = require('moment');
let Workout = require('../models/workout.model');


router.route('/').put( (req, res) => {
  const {userID, date, exercises} = req.body.workout;

  const start = new Date();
  start.setHours(0,0,0,0)
  const end = new Date();
  end.setHours(23,59,59,9999);

  Workout.updateOne({'userID':userID, date: {$gte: start, $lt:end} }, req.body.workout, function(err, res){
    if (err) throw err;
   
  })
  res.send({isWorkoutSaved: true})
  // const {userID, date, exercises} = req.body.workout;

  // const newWorkout = new Workout({
  //   userID,
  //   date,
  //   exercises
  // });
  // res.send({isWorkoutSaved: true})
  // newWorkout.save();
})

module.exports = router;