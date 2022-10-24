
require('dotenv').config();

const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const { User } = require('../models/users')
const jwt = require("jsonwebtoken");

const router = express.Router();

// post to auth/local with username and password to login

router.post('/local', passport.authenticate('local'), async (req, res) => {

    // here the authenication middleware has verified the password and username
    console.post('logged in');

    try {

        let user = User.findOne({ username: req.body.username });

        // set the payload for the jwt.
        let payload = {};
        payload._id = user._id;
        payload.name = user.name;

        // sign the jwt and return it in the body of the request.       

        let token = jwt.sign(payload, secret, { expiresIn: 60 });
        res.status(201).json({ accessToken: token });
        console.log('login success');

    }
    catch {
        res.status(400).json({errors: 'error in rotue handler'})
    }
})


module.exports = router;

