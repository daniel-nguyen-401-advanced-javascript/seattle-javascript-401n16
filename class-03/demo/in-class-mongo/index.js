'use strict';

const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/app';
const Notes = require('./models/notes-schema.js');
const Categories = require('./models/categories-schema.js');

// start the database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// do some actions
// these actions are async!

let args = process.argv.slice(2);

const dbOperations = async () => {
    if (args.length > 0) {
        // probably want to save a new note
        // model = Notes
        // build a piece of data that fits the rules of the model
        let newNote = new Notes({
            note: args[0],
        });

        try {
            await newNote.save();
            // if it belongs to a category
            // see if that category exists
            // if not, add that category (let newCat = new Categories({}))

            // if so then get the id of that category
            // save that id in the category array for this note
        } catch (e) {
            console.error(e);
        }
    }

    let importCat = await Categories.findOne({ name: 'important' });

    let importCatId;
    if (importCat) importCatId = importCat._id;

    let allNotes = await Notes.find();
    // filter to only the notes that have category "important"

    allNotes.forEach(val => {
        console.log(val.note);
    });

    console.log('--------');

    console.log(importCatId);

    // close the database
    mongoose.disconnect();
};

dbOperations();
