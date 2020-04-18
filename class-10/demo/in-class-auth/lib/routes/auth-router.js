'use strict';

// Esoteric Resources
const express = require('express');
const bcrypt = require('bcrypt');

// Internal Resources
const Model = require('../models/model.js');
const userSchema = require('../models/user-schema.js');

// Variables
const UsersModel = new Model(userSchema);
const router = express.Router();

// Route-wide Middleware

const base64Decoder = (encodedString) => {
    let data = {
        username: '',
        password: '',
    };

    // base64(username + ':' + password)

    // A Buffer:
    // mostly temp storage - data without a type enforced
    // make raw data that is stored as bits (0s and 1s)
    // benefit of this is that conversion is really easy

    let decodedString = Buffer.from(encodedString, 'base64').toString();
    let dataPieces = decodedString.split(':');

    data.username = dataPieces[0];
    data.password = dataPieces[1];

    return data;
};

/**
 * This route lets you create a user, with the user credentials in the request body
 * @route POST /signup-body
 * @group auth - operations for signup and signin
 * @param {string} username.body.required - This is the unique user's username
 * @param {string} password.body.required - The user's password
 * @param {string} fname.body - The user's first name
 * @param {string} lname.body - The user's last name
 * @returns {object} 201 - The created user object
 */
router.post('/signup-body', async (req, res, next) => {
    // create a user from data in req.body
    let user = await UsersModel.create(req.body);

    res.status(201);
    res.send(user);
});

/**
 * This route lets you create a user, with the user credentials in authorization header
 * @route POST /signup-headers
 * @group auth - operations for signup and signin
 * @param {string} authorization.headers.required - This is the basic auth encoding for the user's username and password
 * @param {string} fname.body - The user's first name
 * @param {string} lname.body - The user's last name
 * @returns {object} 201 - The created user object
 * @returns {null} 401 - Nothing if there was an error
 */
router.post('/signup-headers', async (req, res, next) => {
    // create a user from data in req.headers.authorization
    let basicAuth = req.headers.authorization.split(' ');

    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
        let userData = base64Decoder(basicAuth[1]);
        // userData should now look something like:
        // { username: 'bUser', password: 'bPass' }

        // req.body should look something like:
        // { fname: 'Bill', lname: 'Biggs' }

        // I want to consolidate into one big object
        // {
        //   username: 'bUser',   // userData.username
        //   password: 'bPass',   // userData.password
        //   fname: 'Bill',       // req.body.fname
        //   lname: 'Biggs',      // req.body.lname
        // }

        // ...userData will give us: username: 'bUser', password: 'bPass'
        // ...req.body will give us: fname: 'Bill', lname: 'Biggs'
        // we can wrap these in a new object and specify the order

        // {  username: 'bUser', password: 'bPass', fname: 'Bill', lname: 'Biggs' }

        let user = await UsersModel.create({ ...userData, ...req.body });
        res.status(201);
        res.send(user);
    }

    res.status(401);
    res.end();
});

router.post('/signin', async (req, res, next) => {
    // get user data from encoded Basic Auth
    let basicAuth = req.headers.authorization.split(' ');

    if (basicAuth.length === 2 && basicAuth[0] === 'Basic') {
        let userData = base64Decoder(basicAuth[1]);

        let possibleUsers = await UsersModel.readByQuery({
            username: userData.username,
        });

        for (let i = 0; i < possibleUsers.length; i++) {
            let isSame = await bcrypt.compare(
                userData.password,
                possibleUsers[i].password,
            );

            if (isSame) {
                req.user = possibleUsers[i];
                break;
            }
        }

        if (req.user) {
            res.status(200);
            res.send(req.user);
        } else {
            next({ status: 401, message: 'Unauthorized' });
        }
    }

    res.end();
});

// Error Handling

// Exports
module.exports = router;
