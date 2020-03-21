// Notes Class
const Validator = require('./Validator.js');
const notesSchema = require('./notes-schema.js');

class Note {
    constructor(noteInput) {
        this.validator = new Validator(notesSchema);
        this.body = noteInput.command.payload;
        this.id = Math.random();
        if (noteInput.command.action) this.execute(noteInput.command);
    }

    valid() {
        return this.validator.validate({ id: this.id, note: this.body });
    }

    execute(command) {
        if (command.action === 'add') this.add(command.payload);
    }

    add(payload) {
        console.log(payload);
    }
}

// index.js

const Note = require('./Note.js');
const Input = require('./Input.js');

// capture all the command line content
// "node index.js -a 'my test note'"

let importantStuff = process.argv.slice(2); // ['-a', 'my test note']

let formattedInput = new Input(importantStuff); // creates instance of Input
let note = new Note(formattedInput); // creates instance of Note

// testing Validator

class Validator {
    constructor(schema) {
        this.schema = schema;
    }

    validate(object) {
        // some process to validate
    }

    isRequiredFieldPresent(fieldName, object) {
        return true / false;
    }

    isString(str) {
        return true / false;
    }
}

// test file

let testSchema = {
    id: { type: 'number', required: true },
    name: { type: 'string', required: true },
};

let inValidObjectA = {};
let inValidObjectB = {
    id: 'test',
    name: 'test',
};
let inValidObjectC = {
    id: 3,
};
// create more options

let validObject = {
    id: 3,
    name: 'sarah',
};

let validator = new Validator(testSchema);

// in your tests,
// expect that invalid objects (A-??) always return false
// when you call .validate();

describe('', () => {
    it('', () => {
        expect(validator.validate(inValidObjectA)).toBe(false);
    });
});

// expect valid objects to return true when you call
// .validate();

expect(validator.validate(validObject)).toBe(true);

// expect .isString to return false when not given a string

expect(validator.isString(3)).toBe(false);

// expect .isString to return true when given a string

expect(validator.isString('test')).toBe(true);
