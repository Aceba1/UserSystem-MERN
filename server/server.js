// Loads the secret 
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./userRouter');


// express app
const app = express();
// middleware & static files
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.use((req, res, next) => { 
    console.log(`${req.url} ${req.ip}`);
    next();
});

// Routers
app.use('/user', userRouter);

// ENV CONSTANTS
const 
    PORT = process.env.PORT || 4000, //Port number for server to listen on, defined in enviorment file
    URI = process.env.MONGO; // URI that gives read/write access to database, this need to be stored in an env so that the public can not read/write your database without going through your API

// Connect to DataBase
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(res => {
        console.log('Connected to DB!');
        
        // Listen for access requests ONLY after connecting to DB
        app.listen(PORT);
    })
    .catch(err => {
        console.log('Failed to connect to DB!\n' + err);
    })