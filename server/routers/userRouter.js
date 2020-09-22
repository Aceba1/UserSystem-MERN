const express = require("express");
const validateUser = require('../middleware/validateUser');
const addUser = require('../middleware/addUser');
const checkUserCreds = require('../middleware/checkUserCreds');
const createJWT = require('../middleware/createJWT');

const router = express.Router();

router.post('/register', 
    validateUser, 
    addUser,
    createJWT,
    async (req, res) => { // Should really combine this async with the one below as middleware
        try {
            //req.userData is defined by the validation middleware
            //const newUser = await User.create(req.userData);
            res.status(201).json({ token: req.token, user: req.user }); 
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
            res.json({ token: req.token, user: req.user }); // Stringify object or whatever is necessary, or what is requested. Could also do requested user operations here
        } catch (err) {
            res.status(500).json({
                message: err.message,
                error: err
            })
        }
});

module.exports = router;