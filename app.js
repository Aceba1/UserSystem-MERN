const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//const body = require('body-parser'); //TODO: remove body-parser
const userRouter = require('./userRouter');

// express app
const app = express();

// register view engine
//app.set('view engine', 'react'); // Server-side rendering
// app.set('views', 'views'); // <- folder of EJS

// listen for requests
app.listen(4000);

app.use(cors());

// middleware & static files
app.use((req, res, next) => { 
    console.log(`${req.url} ${req.ip}`);
    next();
});

app.use(express.static('public'));
app.use(express.json());

app.use(morgan('dev'));

app.use('/user', userRouter);

// // 404 page - The order of these app stuff is important, 
// // it tests every one going down. App.Use is unconditional. 
// app.use((req, res) => {
//     res.status(404).end();
// });