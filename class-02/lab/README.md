# LAB: Classes, Inheritance, Functional Programming

In this lab, you will be doing your first "refactoring", which is the process of migrating working code into a new methodology or tech stack. Today, you'll refactor your standard constructor functions and prototypes into a class, keeping the functionality (and the interface) exactly the same.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

### Getting Started

> Building off of your previous day's branch, create a new branch for today called 'classes' and continue to work in your 'notes' repository.

## Notes Application Requirements

Your functional requirements are the same as for the previous lab:

- Create a command line application using Node.js called `notes` which will allow the user to specify a note (aka a string) to be added to a database

  > The database portion of this assignment will be covered in a later class! For now, just prioritize printing to the console instead of "saving" to a database.

The user should be able to type the `notes` command with an add flag and a string of text, like this:

```bash
notes -a "This is a really cool thing that I wanted to remember for later"
```

- The `-a` (or `--add`) will tell your application that the user wants to ADD a new note
- All of the text following the `-a` (in the quotes) is the text of the note itself
- If the user doesn't provide a valid flag (`-a`), show them an error
- If the user specifies the flag, but doesn't provide any text, show them an error

### Implementation Details

- Refactor your previous work by re-implementing both the `Input` and `Notes` library modules as ES6 classes
- Your previous tests should remain functioning after the refactor
- Create a schema for the command object (action + payload) created by the Input class and the Note (id + note contents) created by the Notes class
  - The command object should have an action that is a recognized action (for now just `'add'`, though this list may grow)
  - The command object may or may not have a payload
  - The Note should have an id that is of type number
  - The Note should have some contents of type string

#### Add validation to the Input and Notes Classes

- Your Input class should have a method called `valid()` which inspects the command object and returns a boolean if it is properly formatted according to your rules
- Add a new method to the Notes class called `valid()` which should inspect the note object and return a boolean if it is properly formatted according to your rules
- Implement these methods using a new `Validator` class (see requirements below)

#### Compose a validation class library

> `lib/validator.js`

Write a "Validator" class that can validate whether or not an entity is satisfactory based on a provided schema.

Implementation details: 

- Exports a class
  - The constructor should accept a single parameter
    - An object that is a set of "rules" for validation (called a "schema")
  - The class should expose a method called `validate()` that accepts a single parameter
    - An object to validate against the saved schema 
  - When called, the validate() method should return a boolean indicating whether the object is valid based on the schema
- Things we want to be able to validate
  - Is the object we're trying to validate actually an object?
  - All all "required" properties present and do they have values?
  - For any property that specifies a type, does the value match that type?
- **Examples**
  - Consider this set of rules, which describe what a valid person object should look like

      ```javascript
      const personRules = {
        id: {type: 'string', required: true},
        name: {type: 'string', required: true},
        age: {type: 'number', required: true},
        children: { type: 'array', valueType: 'string' },
      };
      ```

  - Given those schema rules, this person should be validated as `true`

      ```javascript
      const susan = {
        id:'123-45-6789',
        name:'Susan McDeveloperson',
        age: 37,
        children:[],
      };
      ```

    - This one, as `false`

      ```javascript
      const fred = {
        id:38,
        name:'Freddy McCoder',
        children:[],
      };
      ```

##### Testing the Validation Module

- Test each method for proper/improper use (required params)
- Validate that validation is reliable
- Validate proper error conditions/returns

## Assignment Submission Instructions

Refer to the the [Submitting Standard Node.js Lab Submission Instructions](../../../reference/submission-instructions/labs/node-apps.md) for the complete lab submission process and expectations

> This application must be deployed to npm as an installable package.  Please include a link to your npm page for this application with your submission
