const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

const failedLogin = (res, message) => {
  return res.status(400).json({message});
}

module.exports = async (req, res, next) => {
  try {
    
    const { credidential, password, token } = req.body;

    if (token) {
      try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET, {}); // Throws an exception if the token is invalid
        
        const user = await User.findById( id ); 

        if (user === null) {
          console.error(`\nLogin Failed: '${id}' Not In Use`);
          return failedLogin(res, "Could Not Find User");
        }
        req.id = user._id;
        req.user = user.username;
  
        console.log("User login " + user.username + " " + user.email + " has passed validation by token");
        next() //if code execution reaches here, it is assumed the user has successfully logged in
        return;
      } catch (error) {
        console.log(error.message);
        return failedLogin(res, error.message);
      }
    }

    if (credidential === undefined || password === undefined)
      return failedLogin(res, "Username Or Password Undefined")

    const 
      c = credidential.trim().toLowerCase(),
      p = password.trim();

    const 
      query = {}, 
      field = emailRegex.test(c) ? 'email' : 'username'; 

    query[field] = c;

    const
      projection = {password: 1, username: 2, email: 3}, 
      user = await User.findOne(
          query, 
          projection
        ); 

    if (user === null) {
      console.error(`\nLogin Failed: '${field}' Not In Use`);
      return failedLogin(res, "Username Or Password Incorrect")  
    }

    const pass = req.body.password,
        passTest = 
        (pass === undefined || pass.trim() === '') 
          ? false 
          : await bcrypt.compare(pass, user.password);

    if (!passTest) {
      console.error('\nLogin Failed: Password Invalid');
      return failedLogin(res, "Username Or Password Incorrect")  
    }

    req.id = user._id;
    req.user = user.username;


    console.log("User login " + user.username + " " + user.email + " has passed validation");
    next() //if code execution reaches here, it is assumed the user has successfully logged in
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message || err
    })
  }
}
