require('dotenv').config();
   
const jwt = require('jsonwebtoken');




let secret =  process.env.JWTSECRET // 


// this 
// a) checks that there is a Bearer token in the authorization header
// b) the token is valid using the secret

function validJWTNeeded (req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).json({"error": "no Bearer token"});
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).json({error : err});
        }
    } else {
        return res.status(401).json({"error": "no authorization header"});
    }
};

module.exports = { validJWTNeeded, }