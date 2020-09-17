const User = require("../models/User");
const bcrypt = require("bcrypt");

const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

const failedLogin = ( req, res) => {
    return res.status(400).json({message: "Username Or Password Incorrect"});
}

module.exports = async (req, res, next) => {
    
    try {
    
    const { credidential, password } = req.body;

    const c = credidential.trim().toLowerCase();
    p = password.trim();

        const 
            query = {}, 
            field = emailRegex.test(c) ? 'email' : 'username'; 

        query[field] = c;

        const
            projection = {password: 1}, 
            user = await User.findOne(
                    query, 
                    projection
                ); 

        if (user === null) {
            console.error(`\nLogin Failed: '${field}' Not In Use`);
            return failedLogin(req, res)    
        }

        const pass = req.body.password,
              passTest = 
                (pass === undefined || pass.trim() === '') 
                    ? false 
                    : await bcrypt.compare(pass, user.password);

        if (!passTest) {
            console.error('\nLogin Failed: Password Invalid');
            return failedLogin(req, res)    
        }

        req.id = user._id;


        console.log("User login " + user.username + " " + user.email + " has passed validation");
        next() //if code execution reaches here, it is assumed the user has successfully logged in
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || err
        })
    }
}
