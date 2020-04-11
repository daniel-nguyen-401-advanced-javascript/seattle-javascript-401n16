'use strict';

const express = require('express');
const router = express.Router();
const VegetablesModel = require('../models/vegetables/vegetables-model.js');

const logVeg = (req, res, next) => {
    console.log('IN VEGGIE ROUTE');
    next();
};

router.use(logVeg);

router.get('', async (req, res, next) => {
    // do something to get all fruits
    let results = await VegetablesModel.readByQuery({});
    res.send(results);
});

router.get('/legume', (req, res, next) => {
    // do something to get all fruits
    res.send('getting legume veggies');
});

module.exports = router;
