const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/keys').MongoURI;

let Exercise = require('../models/exercise.model');

router.route('/').get( (req, res) => {
  Exercise.find()
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;