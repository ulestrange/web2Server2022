require('dotenv').config();
const express = require('express');
const { User } = require('../models/users')
const jwt = require("jsonwebtoken");
const { isRequired } = require('nodemon/lib/utils');

const router = express.Router();

// post to /users with name username and password to login

router.get('/' , (req, res) => res.send('get works'));

router.post('/', async (req, res) => {
    console.table(req.body);

    try {
        let user = await User.register(
          new User({ email:req.body.email, username:req.body.username }),
            req.body.password);

            res.location(user._id).
            status(201).
            json(user._id);
    }
    catch (error) {
            res.status(400).json({error : error});
            return;
    }
})

module.exports = router;