const express = require("express");

const router = express.Router();

// router.use('/', (req, res, next) => {
//     res.send('get /user ?');
//     console.log('get /user ?');
//     next();
// });

router.use('/login', (req, res) => {
    console.log(req.body);
    res.status(200).send('Received login!');
});

router.use('/register', (req, res) => {
    console.log(req.body);
    res.status(200).send('Received register!');
});

module.exports = router;