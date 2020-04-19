const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  gif:{
    type: String,
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;