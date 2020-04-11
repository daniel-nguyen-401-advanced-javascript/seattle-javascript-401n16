'use strict';

const express = require('express');
const router = express.Router();
const FruitsModel = require('../models/fruits/fruits-model.js');

const GenericModel = require('../models/model.js');
const fruitsSchema = require('../models/fruits/fruits-schema.js');
const FruitsModelFromGeneric = new GenericModel(fruitsSchema);

/**
 * This route gives us all the fruits
 * @route GET /fruits
 * @group fruits
 * @returns {array} 200 - A list of records that are in the fruits collection
 */
router.get('', async (req, res, next) => {
    let results = await FruitsModelFromGeneric.readByQuery({});

    res.send(results);
});

router.get('/:id', async (req, res, next) => {
    let record = await FruitsModelFromGeneric.read(req.params.id);
    res.send(record);
});

module.exports = router;
