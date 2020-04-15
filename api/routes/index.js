const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/keys').MongoURI;

MongoClient.connect(url, (err, db) => {
  if(err) throw err;
  const dbo = db.db('fitntrack');

  dbo.collection('exercises').find({}).toArray( (err, result) => {
    if (err) throw err;
    router.get('/', (req, res) => res.send(result));
    db.close()
  })
})

module.exports = router;