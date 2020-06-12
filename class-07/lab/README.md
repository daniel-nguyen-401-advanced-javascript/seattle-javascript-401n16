# Lab 07 --- Express

In this lab, you will be creating an Express server with multiple endpoints that allow for data manipulation. Essentially, this will be similar to Lab 06, but with the constraint that `json-server` is not being used. 

## Application Overview

Your application will have all CRUD endpoints for `categories` and `products`, though note that in this lab you will NOT be required to actually modify any data long-term (we'll get to this in a future lab!). The following endpoints must be implemented: 

```bash
GET /categories
```

```bash
POST /categories
```

```bash
PUT /categories/:id/
```

```bash
DELETE /categories/:id/
```

```bash
GET /products
```

```bash
POST /products
```

```bash
PUT /products/:id/
```

```bash
DELETE /products/:id/
```

You must also have 404 and 500 error handling built in, as well as timestamp and logging for all of your received requests. 

## Getting Started

1. Create a new GitHub repository for your lab 

2. Copy over your `db.json` from Lab 06 - we will be using the same categories and products data in this lab. 

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
   db.json
   package.json
   
   /_tests_
   	server.test.js
   	
   /docs
   	swagger.js
   
   /lib
   	server.js
   	/middleware
   		404.js
   		500.js 
   		logger.js
   		timestamp.js
   ```

6. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation 

Your major implementation task will be build a server with the same functionalities as your `json-server` from Lab 06. You will also be asked to write tests for your server. 

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start. 

### index.js 

This file should be very minimal, only containing the commands to start the server. Remember, we want to write tests for our server, so all server code should go in the module file `lib/server.js`. This will allow our test files to import the server. Therefore, refrain from defining your server in `index.js`.

### db.json

This is ideally the same file as used in your Lab 06, where some sample categories and products data is defined. This file should have two arrays, `categories` and `products`, each with 2-3 objects inside them. These objects should follow the defined schema below:

#### Categories Schema

```javascript
{
  id: { required: true, type: Number },
  name: { required: true, type: String },
  display_name: { type: String },
  description: { type: String }
}
```

#### Products Schema

```javascript
{
  id: { required: true, type: Number },
  category: { required: true, type: String },
  name: { required: true, type: String },
  display_name: { type: String },
  description: { type: String }
}
```

### lib/server.js

This is your main server file, which defines all the server functionality. This file should export a server object and a start function. It should also assign all the middleware this server is using (404, 500, timestamp, logging), defined in `lib/middleware`. Your server should define all the routes for CRUD operations upon products and categories from `db.json`.

Note that you do NOT have to modify the `db.json` file when the CRUD operations are executed. Instead, when your server runs, your `server.js` file should import the contents of `db.json` and save that as an object. Then, any CRUD routes can modify or return this in-memory object. 

```javascript
let db = require('../db.json'); 
```

> Here, we want to use a `let` instead of `const`, because we are copying over the JSON content as a JavaScript object and may modify the JavaScript object during our CRUD operations (whereas `const` should not be modified). This should not affect the `db.json` file. 

### docs/swagger.js

This file should contain your `express-swagger-generator` documentation. See Code Documentation/Cleanliness section of Lab Submission. 

### lib/middleware

In your middleware folder, you should have one file defined for each of the required middleware functions. These files should each export their middleware function. Here's an overview of the required middleware: 

#### 404.js

When a client attempts to make a request to a route that is not explicitly defined in `server.js`, the 404 middleware should set the response status to `404` and the response status message to 'Resource Not Found'. You can then choose what you would like to send in the response body; either an error object, an error string, or nothing! 

#### 500.js 

This file is proper error middleware for your server, and thus should export a function with four parameters instead of three. Within the function body, set the response status to 500 and the response status message to 'Internal Server Error'. You can then choose what you would like to send in the response body; either an error object, an error string, or nothing!

#### timestamp.js

This middleware creates a timestamp (a new Date object) and assigns it as a new key-value pair on the request object. The key name of this new property should be `requestTime`. 

#### logger.js

This middleware logs out a message containing the time the request was received, the method of the request, and the url/path of the request. 

### server.test.js

In your server test file, use the npm package `supergoose` to help facilitate testing your Express server. You should test all your defined endpoints, ensuring that the status code, message and returned body (if a body is returned) match expectations. 

## Lab Submission 

In order to submit this lab, you will need to provide a link to your lab `README.md`, AND you will need to deploy your server application to Heroku. 

* Heroku deployment
  * Set up automatic deployments on Heroku with your lab repository
  * Ensure that once deployed, you can use a tool like Postman or [this sample react application](https://w638oyk7o8.csb.app/) to access endpoints at your new Heroku URL
  * In your `README.md` be sure to provide a link to your deployed Heroku server
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
  * Ensure that all of your Express endpoints are documented with JSDoc-like Swagger comments, and that you can generate your swagger documentation using `express-swagger-generator`
    * [Official Documentation](https://github.com/pgroot/express-swagger-generator) 
    * Be sure to put all of your `express-swagger-generator` configuration in your `/docs/swagger.js` file
    * Be sure to provide a link to your generated Swagger documentation in your `README.md`
      * This should typically be `<your server url>/api-docs`
* Canvas Submission
  * Submit a link to your lab's `README.md` 
  * Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade
