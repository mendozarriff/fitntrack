const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

const Exercise = require('../models/exercise.model');
const Workout = require('../models/workout.model');

router.route('/').get( (req, res) => {

  Exercise.find()
  .then(data => res.json({exercises: data, user: req.user }))
  .catch(err => res.status(400).json('Error: ' + err))
})


router.get('/dashboard',ensureAuthenticated ,(req, res) => {
    // res.send({user: req.user, authorized: true})

    Workout.find({'userID': req.user.id})
    .then(data => res.json({workouts: data, user: req.user, authorized: true}) )
    .catch(err => res.status(400).json('Error: ' + err))
  }
);

module.exports = router;