'use strict';

const express = require('express');
const router = express.Router();
const fruitSchema = require('../models/fruits-schema.js');
const Model = require('../models/model.js');

const FruitsModel = new Model(fruitSchema);

/**
 * This route gives us all the fruits
 * @route GET /fruits
 * @group fruits
 * @returns {array} 200 - A list of records that are in the fruits collection
 */
router.get('', async (req, res, next) => {
    let results = await FruitsModel.readByQuery({});

    res.send(results);
});

router.get('/:id', async (req, res, next) => {
    let record = await FruitsModel.read(req.params.id);
    res.send(record);
});

module.exports = router;
