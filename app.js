const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
//app.set('view engine', 'react'); // Server-side rendering
// app.set('views', 'views'); // <- folder of EJS

// listen for requests
app.listen(4000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<p>No, get away</p>');
});

app.put('/about', (req, res) => {
    res.render('about', { title: 'About' });
    //res.send('<p>about page</p>');
    //res.end();
});

app.put('/user/login', (req, res) => {
    console.log(req.body);
    res.redirect('/');
    res.send('<p>Got it ;)</p>');
})

app.put('/user/register', (req, res) => {
    console.log(req.body);
    res.redirect('/');
    res.send('<p>Got it ;)</p>');
})

// 404 page - The order of these app stuff is important, 
// it tests every one going down. App.Use is unconditional. 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});