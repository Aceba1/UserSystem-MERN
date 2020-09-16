//const User = require('../models/User');
const bcrypt = require('bcrypt')

const usernameRegex = /^\w{3,21}$/;
const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

const msgs = {
    emailInUse: 'Email Already In Use',
    emailVaild: 'Valid Email Required',
    userChars: "Username Must Use Alphanumeric Characters Only",
    userInUse: "Username Already In Use",
    legthInvalid: (field) => {
        return `The Given ${field} Did Not Meet Length Requirements`
    }
}

const validate = async (req, res, next) => {

    const { email: e, password: p, username: u } = req.body;

    failedValues = [];

    if (!emailRegex.test(e)) {
        failedValues.push({
            key: "email",
            message: msgs.emailVaild
        })
    }

    const emailInUse = false;//await User.findOne({ email: e }) != null;
    if (emailInUse) {
        failedValues.push({
            key: "email",
            message: msgs.emailInUse
        })
    }

    if (e != undefined && e.length < 6 || e.length > 254) {
        failedValues.push({
            key: "email",
            message: msgs.legthInvalid('Email')
        })
    }

    if (u == undefined || !usernameRegex.test(u)) {
        failedValues.push({
            key: "username",
            message: msgs.legthInvalid('Username')
        })
    } else if ( !validator.isAlphanumeric(u, 'en-US') ) {

        failedValues.push({
            key: "username",
            message: msgs.userChars
        })
    } 
    
    const userInUse = false;//await User.findOne({ username: u }) != null;
    if (userInUse) {
        failedValues.push({
            key: "username",
            message: msgs.userInUse
        })
    }

    if ( p.length < 7 || p.length > 1000  ) {
        failedValues.push({
            key: "password",
            message: msgs.legthInvalid('Password')
        })
    }

    if (failedValues.length > 0) {
        res
            .status(400)
            .json({
                validation_error: failedValues
            })
    } else {

        const encryptedPass = await bcrypt.hash(p, 10);

        req.userData = {
            email: e,
            username: u,
            password: encryptedPass,
        }
        next()

    }

}

module.exports = validate;