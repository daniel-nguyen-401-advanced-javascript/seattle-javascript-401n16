'use strict';

const mongoose = require('mongoose');
const NotesModel = require('./notes-schema.js');

class NoteActionHandler {
    constructor(command) {
        if (command && command.action) this.execute(command);
        else console.error('Incorrect constructor parameter');
    }

    execute(command) {
        switch (command.action) {
            case 'add':
                if (!command.payload) {
                    console.error('Missing payload');
                    return;
                }
                this.add(command.payload, command.category);
                break;
            case 'list':
                this.list(command.payload);
                break;
            case 'delete':
                if (!command.payload) {
                    console.error('Missing payload');
                    return;
                }
                this.delete(command.payload);
                break;
            default:
                break;
        }
    }

    async add(noteText, category) {
        try {
            let newNote = new NotesModel({
                text: noteText,
                category: category ? category : '',
            });
            await newNote.save();
            mongoose.disconnect();
        } catch (e) {
            console.error('Could not add note');
        }
    }

    async list(category) {
        let allNotes = [];

        try {
            allNotes = await NotesModel.find();
        } catch (e) {
            console.error('Could not find notes');
        }

        allNotes.forEach(val => {
            if (category) {
                if (val.category === category) {
                    console.log('-----------');
                    console.log(val.text);
                }
            } else {
                console.log('-----------');
                console.log(val.text);
            }
        });
        mongoose.disconnect();
    }

    delete(noteId) {}
}

module.exports = NoteActionHandler;
