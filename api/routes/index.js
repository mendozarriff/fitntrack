const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

let Exercise = require('../models/exercise.model');

router.route('/').get( (req, res) => {

  Exercise.find()
  .then(data => res.json({exercises: data, user: req.user }))
  .catch(err => res.status(400).json('Error: ' + err))
})


router.get('/dashboard',ensureAuthenticated ,(req, res) => {
    res.send({user: req.user, authorized: true})
  }
);

module.exports = router;