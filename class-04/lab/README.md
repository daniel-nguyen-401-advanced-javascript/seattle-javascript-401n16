# Lab 04 --- Advanced Mongo/Mongoose

In this lab, we'll be continuing our work on the `notes` command-line application. 

## Application Overview

The application you're building should be deployed to `npm` so that it may be installed by another developer onto their own machine. Once installed, you should be able to call and run your application using the `notes` command. For example instructions on how to get this command set up, refer to the following links: 

| [01](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e) | [02](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e) |

### Commands 

Your application should support the following commands / functionality: 

#### Simple Add

```bash
notes --add "My new note"
```

```bash
notes -a "My new note"
```

#### Add With Category

```bash
notes --add "My new note" --category random
```

```bash
notes -a "My new note" -c random
```

#### List All Notes

```bash
notes --list
```

```bash
notes -l
```

#### List Notes from Category

```bash
notes --list random
```

```bash
notes -l random
```

#### Delete Note

*Replace `<id>` with the id of the note you wish to delete*

```bash
notes --delete <id>
```

```bash
notes -d <id>
```

## Getting Started

1. Create a new GitHub repository for your lab 

2. Copy over your existing Lab 03 code, which will serve as your "starter code"

3. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

4. Ensure your directory has the following files at the top level (not in any sub-folders): 

   * `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

   * `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

   * `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

   * `package.json` with the following scripts: 

     ```json
     "start": "node index.js",
     "lint": "eslint **/*.js",
     "test": "jest --verbose --coverage",
     "test-watch": "jest --watchAll --verbose --coverage"
     ```

5. Set up the file structure for this lab according to the following outline: 

   > The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start. 

   ```
   .gitignore
   .eslintrc.json
   .eslintignore
   index.js
   package.json
   
   /_tests_
   	input.test.js
   	notes-action-handler.test.js
   	notes-model.test.js
   
   /lib
   	input.js
   	notes-action-handler.js
   	/models
   		notes-schema.js
   		notes-model.js
   ```

6. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation 

Your major implementation task will be to refactor your Lab-03 code to contain a custom model wrapper class around our Mongoose model. You will also be asked to write tests for your CRUD database operations. 

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start. 

### input.js 

This file should take in the raw command line input from the terminal and use the [`minimist` `npm` package](https://www.npmjs.com/package/minimist) to help parse the input. The resulting parsed input should be of the format `{ action, payload }`.

### notes-schema.js

Add `pre` and `post` hooks for the following Mongoose operations. Each hook should `console.log` a helpful message describing what command is being attempted/has completed. 

* `save()`
* `findOne()`
* `updateOne()`
* `deleteOne()`

### notes-model.js

In this file, create a class with wrapper functions for your major CRUD operations. This file should define and export the class `Notes` with the following class methods: 

* `create()`

* `read()`

  > Note: Many developers rename the `read()` function to a `get()` function. Feel free to choose any of those naming patterns, so long as the functionality is to reading a record from the database. 

* `update()`

* `delete()`

### notes-action-handler.js

This file should interpret a command of the format `{ action, payload }` and execute the correct CRUD operation using the created model interface in `notes-model.js`.

### index.js

Ensure that your application is using your newly created `Notes` class for all database operations, instead of using MongoDB/Mongoose commands directly (for example, call `create()` instead of `save()`)

### notes-model.test.js

In this test file, use the package [`supergoose`](https://www.npmjs.com/package/@code-fellows/supergoose) to test all of your database CRUD operations. Use your `Notes` class defined in `notes-model.js` to create, read, update and delete dummy test data. Confirm that the mock database has been correctly changed and that your pre/post hooks correctly logged to the console. 

## Lab Submission 

In order to submit this lab, you will need to provide a link to your lab `README.md`, AND you will need to deploy your `notes` application to `npm`. 

* `npm` deployment
  * Ensure that any developer can download your application from `npm` 
  * Ensure that once installed, your application can be run using the `notes` command in terminal
  * In your `README.md`, describe how to install your application from `npm` (exact command preferred!)
* `README.md`
  * Ensure your lab `README.md` is well detailed in how to install and run your application
  * Ensure you detail how to run your application tests if someone were to download your application source code
  * Provide a link to a pull request from a feature branch into your lab repository's master branch
    * You can merge the pull request if desired (a link to the PR should still exist)
  * Describe how much testing coverage you achieved (what you tested, why your coverage is sufficient)
  * Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your application fit together. 
* Passing Tests
  * Ensure that your tests all show as green/passing in your setup GitHub action
* Code Documentation / Cleanliness
  * Ensure that your code is well formatted and passes all lint tests 
  * Ensure that all functions and classes within your code are documented with JSDoc comments
    * [Official Documentation](http://usejsdoc.org/about-getting-started.html) 
    * [Cheat Sheet](https://devhints.io/jsdoc) 
    * [Style Guide](https://github.com/shri/JSDoc-Style-Guide)
    * Be descriptive about the purpose of the function / class
    * Declare data types for parameters and return values
    * Note that you do not have to generate a JSDoc hosted website, just the commenting in your code files will suffice
* Canvas Submission
  * Submit a link to your lab's `README.md` 
  * Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade