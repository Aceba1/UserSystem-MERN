const mongoose = require('mongoose');
const User = require('../models/User');

const addUser = async (req, res, next) => {
    console.log('Creating user...');
    const user = new User(req.userData);
    console.log('Saving user...');
    user.save((err, product) => {
        if (err) {
            console.log(err);
        }
        if (product) {
            console.log(product);
        }
    })
    next();
}
module.exports = addUser;