# Lab 08 --- Express Routing & Connected API

In this lab, you will be building off of your Express server from Lab 07, adding a connection to a MongoDB data source and utilizing Mongoose for schema validation.

## Application Overview

Your application will have all CRUD endpoints for `categories` and `products`, which accurately change data stored in a MongoDB database.

```bash
GET /api/v1/categories
```

-   Returns an object of the format `{count, results}`, where `count` is the number of `results`

```bash
GET /api/v1/categories/:id
```

-   Returns a single category object

```bash
POST /api/v1/categories
```

-   Returns the created category object

```bash
PUT /api/v1/categories/:id
```

-   Returns the updated category object

```bash
DELETE /api/v1/categories/:id
```

-   Returns the id of the record deleted

```bash
GET /api/v1/products
```

-   Returns an object of the format `{count, results}`, where `count` is the number of `results`

```bash
GET /api/v1/products/:id
```

-   Returns a single product object

```bash
POST /api/v1/products
```

-   Returns the created product object

```bash
PUT /api/v1/products/:id
```

-   Returns the updated product object

```bash
DELETE /api/v1/products/:id
```

-   Returns the id of the record deleted

You must also have 404 and 500 error handling built in, as well as logging using the package `morgan`.

## Getting Started

1. Create a new GitHub repository for your lab, or create a new branch on your repository from Lab 07

2. Get started with a local MongoDB setup or an Mongo Atlas setup

    - Note that this will be your development database
    - Fill this database with some products and categories, similar to your `db.json` file from Lab 07
    - Create a duplicate "production" database, either through Mongo Atlas or Heroku mLab and fill it with the same starting data - do not modify this production database while developing

3. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

4. Ensure your directory has the following files at the top level (not in any sub-folders):

    - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

    - `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

    - `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

    - `package.json` with the following scripts:

        ```json
        "start": "node index.js",
        "lint": "eslint **/*.js",
        "test": "jest --verbose --coverage",
        "test-watch": "jest --watchAll --verbose --coverage"
        ```

5. Create a `.env` file which contains a variable called `MONGODB_URI` set to your local/development MongoDB url. You may also add a `PORT` variable to the `.env` file.

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
    		categories-schema.js
    		products-schema.js
    	/routes
    		categories.js
    		products.js
    ```

7. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation

Your major implementation task will be build a server with the same functionalities as your Express server from Lab 07, though this time we'll actually be modifying persisted data using Mongoose and MongoDB.

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

### index.js

This file should be very minimal, only containing the commands to start the server. Remember, we want to write tests for our server, so all server code should go in the module file `lib/server.js`. This will allow our test files to import the server. Therefore, refrain from defining your server in `index.js`.

You will have two different urls for your MongoDB; one that's your development database and one that's your production database. Use the environment variable `MONGODB_URI` you defined in your `.env` file while developing. The `dotenv` package will allow you to access your `.env` variables. When you deploy your application to Heroku, create a Heroku config variable also named `MONGODB_URI` with the value equal to your product database url.

### lib/server.js

This is your main server file, which defines all the server functionality. This file should export a server object and a start function. It should also assign all the middleware this server is using (404, 500, `morgan` and `cors`). Your server should utilize all the routes for CRUD operations upon products and categories, and these routes should be individually defined in `/routes/products.js` and `/routes/categories.js`.

### lib/middleware

In your middleware folder, you should have one file defined for each of the required middleware functions. These files should each export their middleware function. Here's an overview of the required middleware:

#### 404.js

When a client attempts to make a request to a route that is not explicitly defined in `server.js`, the 404 middleware should set the response status to `404` and the response status message to 'Resource Not Found'. You can then choose what you would like to send in the response body; either an error object, an error string, or nothing!

#### 500.js

This file is proper error middleware for your server, and thus should export a function with four parameters instead of three. Within the function body, set the response status to 500 and the response status message to 'Internal Server Error'. You can then choose what you would like to send in the response body; either an error object, an error string, or nothing! Now that we're connected to MongoDB, think of when it might be applicable to call this 500 error in your routes.

### lib/models

This folder should include your generic model class, similar to what we built in Lab 04. It should also include the schema definitions and Mongoose models for products and categories.

#### model.js

This should export a generic model class which takes a Mongoose schema/model as a constructor parameter and defines what MongoDB commands should be called in each CRUD operation.

#### categories-schema.js

In this file, you should define a Mongoose schema and export a Mongoose model. Your schema should mimic the below rule-set:

```javascript
{
  id: { required: true, type: Number },
  name: { required: true, type: String },
  display_name: { type: String },
  description: { type: String }
}
```

#### products-schema.js

In this file, you should define a Mongoose schema and export a Mongoose model. Your schema should mimic the below rule-set:

```javascript
{
  id: { required: true, type: Number },
  category: { required: true, type: String },
  name: { required: true, type: String },
  display_name: { type: String },
  description: { type: String }
}
```

### lib/routes

In this folder, you should define the route handlers for `/products` and `/categories`, so that they can be imported into `server.js` and help modularize `server.js`.

#### categories.js

This file should hold all the routes related to CRUD operations upon categories. The file should export an Express Router object.

#### products.js

This file should hold all the routes related to CRUD operations upon products. This file should export an Express Router object.

### docs/swagger.js

This file should contain your `express-swagger-generator` documentation. See Code Documentation/Cleanliness section of Lab Submission.

### **tests**

#### server.test.js

In your server test file, use the npm package `@code-fellows/supergoose` to help facilitate testing your Express server. You should test all your defined endpoints, ensuring that the status code, message and returned body (if a body is returned) match expectations.

#### categories-model.test.js

This file should test all of the MongoDB operations upon the categories model. The tests here should be similar to your Lab 04 model tests.

#### products-model.test.js

This file should test all of the MongoDB operations upon the products model. The tests here should be similar to your Lab 04 model tests.

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `README.md`, AND you will need to deploy your server application to Heroku. Your deployed Heroku app should be connected to your "production" database instead of your development database.

-   Heroku deployment
    -   Set up automatic deployments on Heroku with your lab repository
    -   Ensure that once deployed, you can use a tool like Postman or [this sample react application](https://w638oyk7o8.csb.app/) to access endpoints at your new Heroku URL
    -   Ensure that you can modify data in your production database
    -   In your `README.md` be sure to provide a link to your deployed Heroku server
-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to install and run your application
    -   Ensure you detail how to run your application tests if someone were to download your application source code
    -   Provide a link to a pull request from a feature branch into your lab repository's master branch
        -   You can merge the pull request if desired (a link to the PR should still exist)
    -   Describe how much testing coverage you achieved (what you tested, why your coverage is sufficient)
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your application fit together.
-   Passing Tests
    -   Ensure that your tests all show as green/passing in your setup GitHub action
-   Code Documentation / Cleanliness
    -   Ensure that your code is well formatted and passes all lint tests
    -   Ensure that all functions and classes within your code are documented with JSDoc comments
        -   [Official Documentation](http://usejsdoc.org/about-getting-started.html)
        -   [Cheat Sheet](https://devhints.io/jsdoc)
        -   [Style Guide](https://github.com/shri/JSDoc-Style-Guide)
        -   Be descriptive about the purpose of the function / class
        -   Declare data types for parameters and return values
        -   Note that you do not have to generate a JSDoc hosted website, just the commenting in your code files will suffice
    -   Ensure that all of your Express endpoints are documented with JSDoc-like Swagger comments, and that you can generate your swagger documentation using `express-swagger-generator`
        -   [Official Documentation](https://github.com/pgroot/express-swagger-generator)
        -   [Sample swagger.js File](https://github.com/codefellows/seattle-javascript-401n16/blob/master/reference/swagger.js)
        -   Be sure to put all of your `express-swagger-generator` configuration in your `/docs/swagger.js` file, and then import and call the module function in `server.js`
        -   Be sure to provide a link to your generated Swagger documentation in your `README.md`
            -   This should typically be `<your deployed server url>/api-docs`
-   Canvas Submission
    -   Submit a link to your lab's `README.md`
    -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade
