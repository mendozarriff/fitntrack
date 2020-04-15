const express = require('express');
const mongoose = require('mongoose');

const app = express();
// DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log('MongoDB Connected'))
.catch( (err) => console.log(err))

const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));