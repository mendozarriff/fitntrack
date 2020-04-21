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
const workout = require('./routes/workout')


app.use('/', exercises);
app.use('/workout', workout);



const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

module.exports = app;