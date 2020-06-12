'use strict';

/* 
    - Requires the library files you will be writing (input, notes) DONE 
    - Instantiates an “Input” parser (??)
    - Sends properly parsed input to the Notes library for display (notes module??)
 */

// const a = require('./lib/input.js);
// a(process.argv.splice(2));

const Input = require('./lib/input.js');
const Notes = require('./lib/notes.js');

// if i run `node index.js blah`
// process.argv.slice(2) = ['blah']
let parsedInput = new Input(process.argv.slice(2));
// parsedInput = {
//   command: {}
//   valid: [function]
//}

let notes = new Notes(parsedInput);
