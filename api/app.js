const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log('MongoDB Connected'))
.catch( (err) => console.log(err))

app.use(cors());

app.use('/', require('./routes/index'));

const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));