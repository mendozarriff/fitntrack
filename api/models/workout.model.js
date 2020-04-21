const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  userID:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now()
  },
  exercises_picked:[
    {
      exercise_id: {type:String,required:true},
      name: {type:String,required:true},
      sets: {type:Number, required: true},
      reps: {type:Number, required:true} ,
      weight:{type:Number, required:true, default: 0 }
    }
  ]
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;