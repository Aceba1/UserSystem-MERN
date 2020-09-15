const User = require ('../models/User');
const bcrypt = require('bcrypt');

const validate = async (req, res, next) => {
    const { username: u, password: p, email: e} = req.body;
    if (e == undefined || p == undefined || u == undefined)
        return res.status(400).json({error: 'One or more required values are undefined'});

}