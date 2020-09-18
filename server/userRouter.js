const express = require("express");
const validateUser = require('./middleware/validateUser');
const addUser = require('./middleware/addUser');
const checkUserCreds = require('./middleware/checkUserCreds');
const createJWT = require('./middleware/createJWT');

const router = express.Router();

router.post('/register', 
    validateUser, 
    addUser,
    async (req, res) => {
        try {
            //req.userData is defined by the validation middleware
            //const newUser = await User.create(req.userData);
            res.status(201).send('Received /register');//.json(newUser);
        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
    });

router.put('/login', 
    checkUserCreds,
    createJWT,
    async (req, res) => {
        try {
            res.json(req.token);
        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
});

module.exports = router;