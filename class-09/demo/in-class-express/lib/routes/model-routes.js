'use strict';

// esoteric resources
const express = require('express');
const router = express.Router();

// internal modules
const modelFinder = require('../middleware/model-finder.js');

// middleware
router.param('model', modelFinder);

// routes
// Create Single
router.post('/:model', async (req, res, next) => {
    // a req.body with the new record to create
    // req.colModel with a instance of the correct collection

    let result = await req.colModel.create(req.body);
    res.status(201);
    res.send(result);
});

// Read All
router.get('/:model', async (req, res, next) => {
    let result = await req.colModel.readByQuery({});
    res.status(200);
    res.send(result);
});

// Read Single
router.get('/:model/:id', async (req, res, next) => {
    let result = await req.colModel.read(req.params.id);
    res.status(200);
    res.send(result);
});

// Update Single (new record in req.body)
// Client -> Server -> Client
router.put('/:model/:id', async (req, res, next) => {
    console.log('Run update route (/:model/:id)');
    let result = await req.colModel.update(req.params.id, req.body);
    res.send(result);
    // if I'm here, then I should have req.colModel set
    // to an instance of the Model class (b/c that's what my route middleware did!)
});

// Delete Single
router.delete('/:model/:id', (req, res, next) => {});

module.exports = router;
