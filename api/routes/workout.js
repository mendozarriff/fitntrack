const express = require('express');
const router = express.Router();
let Workout = require('../models/workout.model')


router.route('/').post( (req, res) => {
  const userID = req.body.workout.userID;
  const date = Date.parse(req.body.workout.date);
  const exercises_picked = req.body.workout.workout_picked;
  const errors = [];


  console.log('userID: ', userID)
  console.log('date: ', date)
  console.log('exercises_picked: ', exercises_picked)
  // if(!userID || !date || !exercises_picked){

  // }  

//   const newWorkout = new Workout({
//     userID,
//     date,
//     exercises_picked
//   });

//   if(exercises_picked.length > 0){
//      for(let i=0; i < exercises_picked.length; i++){

//       if(exercises_picked[i].name === '' || exercises_picked[i].sets === '' 
//       || exercises_picked[i].reps === '' || exercises_picked[i].weight === ''){
//         errors.push({msg: 'Please fill in all fields'})
//       }
//     }
 
//   }else{
//     console.log('unable to save data')
//   }

//   if(errors.length > 0){
//     console.log('there arrors in this form')
//     res.render('/',{
//       errors,
//       exercises_picked
//     })
//   }else{
//     newWorkout.save()
//     .then( () => res.json('Workout added!'))
//     .catch(err => res.status(400).json('Error: ' + err))
//   }
});

module.exports = router;