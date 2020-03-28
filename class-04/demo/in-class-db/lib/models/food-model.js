'use strict';
const mongoose = require('mongoose');
const foodMongooseModel = require('./food-schema.js');

class Model {
    constructor(mongooseModel) {
        this.model = mongooseModel;
    }

    async create(record) {
        try {
            let recordToAdd = new this.model(record);
            return await recordToAdd.save();
        } catch (e) {
            console.error('---ERROR CREATING RECORD---');
            return false;
        }
    }

    async read(_id) {
        // first, validate that this is an id
        try {
            if (!typeof _id === mongoose.ObjectId) throw 'err';
            let foundRecords = await this.model.find({ _id });
            if (foundRecords.length) return foundRecords[0];
            else throw 'err';
        } catch (e) {
            console.log('---ERROR READING RECORD---');
            return false;
        }
    }

    async update(_id, changedRecord) {}

    async delete(_id) {
        try {
            let foundDoc = await this.model.find({ name: 'grapes' });
            console.log(foundDoc);
            await foundDoc.findOneAndDelete({ text: noteText }),
                function(err) {
                    if (err) console.log(err);
                    console.log('successful deletion');
                };
            mongoose.disconnect();
        } catch (e) {
            console.error('could not delete');
        }
    }
}

let foodModel = new Model(foodMongooseModel);

module.exports = foodModel;
