const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

// DB config
const uri = require('./config/keys').MongoURI;


app.use(express.json());

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

//Connect to mongo
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDb Database connection established successfully')
});

app.use(express.urlencoded({extended:false}))

// required for passport session


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(flash());



// const exercises = require('./routes/exercises')
const workout = require('./routes/workout');
const workout_update = require('./routes/workout-update')
const register = require('./routes/register')
const login = require('./routes/login');
const logout = require('./routes/logout');
const index = require('./routes/index')

app.use('/', index);
app.use('/workout', workout);
app.use('/workout-update', workout_update);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
// app.use('/dashboard', dashboard);



const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

// module.exports = app;