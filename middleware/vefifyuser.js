
require('dotenv').config();

import userService from '../models/userService';
import crypto from 'crypto';




import { User } from '../models/users';



import axios from 'axios'






// send the token to facebook to check if it is valid and
// get the data we need back.
// this data is then added to the request for processing
// further down the line.

function isValidFaceBookUser(req, res, next) {
    const accessToken = req.body.accessToken;
    console.log('access token from client: ' + accessToken)

    getFacebookData(accessToken).then(
        (data) => {
            console.log (' facebook data '+ JSON.stringify(data));
         
            res.user = {
                facebook_id: data.id, // the facebook id
                name: data.name,
            }
            return next();
        })
        .catch((error) => {
            return res.status(401).send({ errors: 'Unauthorized -from isFacebookValidUser' })
        });
}

// function facebookLogin(req, res) {
//     let token = jwt.sign(res.locals.auth, secret, { expiresIn: minutes * 60 });
//     res.send({ apptoken: apptoken })
// }

// this uses axios which is a package for making http requests from
// a server (the server is acting like a client)


async function getFacebookData(access_token) {
    const { data } = await axios({
        url: 'https://graph.facebook.com/v8.0/me/',
        method: 'get',
        params: {
            access_token: access_token,
            //  fields: ['id','name', 'email'] - not working why????
        }
    });
    return data;
};

function findOrCreateFaceBookUser(req, res, next) {
    User.findOne({ facebook_id: res.user })
        .then((user) => {
            if (user) {
                res.locals.auth = {
                    id: user._id,
                    permissionLevel: user.permissionLevel,
                };
            }
            else {
                const newUser = new User(res.locals.auth);
                newUser.permissionLevel = 1;
                res.locals.auth = {
                    id: newUser._id,
                    permissionLevel: newUser.permissionLevel,
                };

                newUser.save()
                    .then((result) => {
                        console.log('user created from facebook');
                    })
                    .catch((error) => {
                        res.status(401).json({ status: 'fail', message: 'failed to create ' + error })
                    });
            }
            next();
        })
}

export default {
     isValidFaceBookUser,
    findOrCreateFaceBookUser
}