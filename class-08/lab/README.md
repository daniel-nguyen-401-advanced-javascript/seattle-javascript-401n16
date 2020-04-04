# Lab 08 --- Express Routing & Connected API

In this lab, you will be building off of your Express server from Lab 07, adding a connection to a MongoDB data source and utilizing Mongoose for schema validation. 

## Application Overview

Your application will have all CRUD endpoints for `categories` and `products`, which accurately change data stored in a MongoDB database. 

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

1. Create a new GitHub repository for your lab, or create a new branch on your repository from Lab 07

2. Get started with a local MongoDB setup or an Mongo Atlas setup 

   * Note that this will be your development database
   * Fill this database with some products and categories, similar to your `db.json` file from Lab 07
   * Create a duplicate "production" database, either through Mongo Atlas or Heroku mLab and fill it with the same starting data - do not modify this database while developing

3. Add a `README.md` fo your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

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

5. Create a `.env` file which contains a variable called `MONGODB_URI` set to your local/development MongoDB url

6. Set up the file structure for this lab according to the following outline: 

   > The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start. 

   ```
   .gitignore
   .eslintrc.json
   .eslintignore
   .env
   index.js
   package.json
   
   /_tests_
   	server.test.js
   	categories-model.test.js
   	products-model.test.js
   	
   /docs
   	swagger.js
   
   /lib
   	server.js
   	/middleware
   		404.js
   		500.js 
   	/models
   		model.js
   		products-schema.js
   		categories-schema.js
   	/routes
   		products.js
   		categories.js
   ```

7. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation 

Your major implementation task will be build a server with the same functionalities as your Express server from Lab 07, though this time we'll actually be modifying persisted data by using MongoDB. 

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start. 

### index.js 

This file should be very minimal, only containing the commands to start the server. Remember, we want to write tests for our server, so all server code should go in the module file `lib/server.js`. This will allow our test files to import the server. Therefore, refrain from defining your server in `index.js`. 

You will have two different urls for your MongoDB; one that's your development database and one that's your production database. Use the environment variable `MONGODB_URI` you defined in your `.env` file while developing. The `dotenv` package will allow you to access your `.env` variables. When you deploy your application to Heroku, create a Heroku config variable also named `MONGODB_URI` with the value equal to your product database url. 

### lib/server.js

This is your main server file, which defines all the server functionality. This file should export a server object and a start function. It should also assign all the middleware this server is using (404, 500, `morgan` and `cors`). Your server should utilize all the routes for CRUD operations upon products and categories, and these routes should be individually defined in `/routes/products.js` and `/routes/categories.js`.



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



# LAB - Express Routing & Connected API

Create well architected, multiple resource (model) API server, connected to a Mongo Database

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Getting Started

> Building off of your previous day's branch, create a new branch for today and continue to work in your 'api-server' repository.

Remember to bring in the dependencies for your app...

- npm install: cors, morgan, dotenv, mongoose, @code-fellows/supergoose
- If not already running, start mongo server: `mongod --dbpath=/Users/path/to/data/db`

## Requirements

### Features

Create an API server with the following features

- Express server, connected to a mongo database
- Morgan Logger
- CORS Protection
- Error Handling
- 2 Mongo Connected Data Models: categories and products
- Full set of CRUD routes for each model (categories and products), with an `/api/v1` base
  - Routes should return the proper HTTP status codes based on the actual result of the operation
  - GET /api/v1/categories
    - Returns an object with 2 keys: `count` (number) and `results` (array of objects/records from the database)
  - GET /api/v1/categories/ID
    - Takes an ID as a route parameter
    - Returns a single object (the record from the database)
  - POST /api/v1/categories
    - Accepts a full record object to be added to the DB as the request body
    - Returns a single object (the record added to the database)
  - PUT /api/v1/categories/ID
    - Takes an ID as a route parameter
    - Accepts a full record, including id, to be updated as the request body
    - Returns a single object (the record as updated in the database)
  - DELETE /api/v1/categories/ID
    - Takes an ID as a route parameter
    - Returns undefined or null (the record is no longer in the database)

### Implementation Requirements

- Import the mongo data models (categories and products) from your earlier data modeling lab.
  - Put them in a `models` folder in your source tree along with the interface
- Write supergoose tests to verify that your routes are functioning
  - /post saves a new record
  - /get gets all records
  - ...etc
- Routes and handler functions must be modular (via `express.router()`)
  - They should go into a `routes` folder as separate files
    - One for categories
    - One for products
  - They will need to export an express router instance
  - The app will now need to import and use these routes
- Note: Once you've moved the routes out, the tests that you wrote should still work.

### Testing

- Using `supergoose`, Write a complete set of data model and server tests
- Refer to your previous assignments for examples and inspiration

#### Web Server Visual Tests

- Open this [React Application](https://w638oyk7o8.csb.app/)
- In the form at the top of the page, enter the URL to your API Server
- This server is configured to use the routes noted in the first lab requirement
- If your lab is working, this app will show your API Data!

**Engineering Note** This is a main benefit of testing -- asserting that major changes don't effect functionality!

## Assignment Submission Instructions

Refer to the the [Submitting Express Server Lab Submission Instructions](../../../reference/submission-instructions/labs/express-servers.md) for the complete lab submission process and expectations
