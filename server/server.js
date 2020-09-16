require('dotenv').config();

const express = require('express');
//const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
//TODO: remove body-parser
const userRouter = require('./userRouter');

//ENV CONTANTS
const 
    PORT = process.env.PORT || 4000, //Port number for server to listen on, defined in enviorment file
    URI = process.env.MONGO; // URI that gives read/write access to database, this need to be stored in an env so that the public can not read/write your database without going through your API     

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


//Connect to Data-Base
//mongoConnect(URI)
// listen for requests
app.listen(4000);