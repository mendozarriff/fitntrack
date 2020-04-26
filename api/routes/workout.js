const express = require('express');
const router = express.Router();
let Workout = require('../models/workout.model')


router.route('/').post( (req, res) => {

  const {userID, exercises} = req.body.workout;
  const date = Date.parse(req.body.workout.date);
  const errors = [];


  if(!userID){
    errors.push({msg: 'You must be logged in to save workouts'})
  }else if(!exercises){
    errors.push({msg: 'Please go back to pick your exercises'})
  }else if(exercises.length > 0){
    for(let i=0; i<exercises.length; i++){
      if(exercises[i].sets <= 0 || exercises[i].reps <= 0 ){
        errors.push({msg: 'Plese fill your sets and reps'})
      }
    }
  } 
  if(errors.length > 0){
    res.send(errors)
  }else{
    const newWorkout = new Workout({
      userID,
      date,
      exercises
    });
    res.send({isWorkoutSaved: true})
    newWorkout.save();
  } 
});

module.exports = router;