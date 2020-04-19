const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var path = require('path');

const app = express();
// DB config
const uri = require('./config/keys').MongoURI;

app.use(cors());
app.use(express.json());

//Connect to mongo
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb Database connection established successfully')
})

const exercises = require('./routes/exercises')
const workouts = require('./routes/workouts')

//Bodyparser
// app.use(express.urlencoded({extended:false}))

// app.use(logger('dev'));

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', exercises);
app.use('/workout', workouts);

// app.use(function(req, res, next) {
//   next(createError(404));
// });


const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

module.exports = app;