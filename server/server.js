const express = require('express');
//const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
//const body = require('body-parser'); //TODO: remove body-parser
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


// listen for requests
app.listen(4000);