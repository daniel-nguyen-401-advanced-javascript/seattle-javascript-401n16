'use strict';

const mongoose = require('mongoose');
const Input = require('./lib/input.js');
const NoteActionHandler = require('./lib/note-action-handler.js');

const dbURL =
    'mongodb+srv://cf-sonia:seattle-js-401n16@class-03-database-lw31z.mongodb.net/app';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// node index.js -a "my note" -c school
let cli = process.argv.slice(2);

let myInput = new Input(cli);
let myHandler = new NoteActionHandler(myInput.command);
