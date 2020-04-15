'use strict';
const fruitsSchema = require('../models/fruits-schema.js');
const vegetablesSchema = require('../models/vegetables-schema.js');
const departmentSchema = require('../models/departments-schema.js');
const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
    // valid models are: 'products' and 'categories'

    console.log('Run Route Middleware (modelFinder, setting req.colModel)');

    switch (req.params.model) {
        case 'fruits':
            console.log('found model fruits');
            req.colModel = new Model(fruitsSchema);
            next();
            break;
        case 'vegetables':
            console.log('found model vegetables');
            req.colModel = new Model(vegetablesSchema);
            next();
            break;
        case 'departments':
            console.log('found model departments');
            req.colModel = new Model(departmentSchema);
            next();
            break;
        default:
            console.log('invalid model');
            res.status(404);
            res.end();
            break;
    }
};

module.exports = modelFinder;
