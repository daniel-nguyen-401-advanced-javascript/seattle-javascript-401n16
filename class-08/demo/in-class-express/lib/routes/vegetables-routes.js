'use strict';

const express = require('express');
const router = express.Router();

const logVeg = (req, res, next) => {
    console.log('IN VEGGIE ROUTE');
    next();
};

router.use(logVeg);

router.get('', (req, res, next) => {
    // do something to get all fruits
    res.send('getting veggies');
});

router.get('/legume', (req, res, next) => {
    // do something to get all fruits
    res.send('getting legume veggies');
});

module.exports = router;
