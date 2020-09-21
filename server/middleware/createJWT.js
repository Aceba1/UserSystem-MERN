const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION; // Could parameterize by user

module.exports = async (req, res, next) => {
    try {
        req.token = jwt.sign({id: req.id}, secret, {expiresIn: expiration});
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err.message || err
        })
    }
}