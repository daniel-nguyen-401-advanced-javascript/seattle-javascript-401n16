# Lab 14 --- Access Control

In this lab, you'll continue to build off of your authentication server from Lab 13, adding the ability to have Role Based Access Control (RBAC) upon certain routes. 

## Application Overview

Your server application should have the following routes defined:

```bash
POST /signup
```

This route should accept a JSON object with the keys "username" and "password" in the request body. From this information, a new user record should be created in the Mongo database.

```bash
POST /signin
```

This route should accept a Basic Authentication encoded string in the request headers (`req.headers.Authorization`). The encoded string should then be validated to match a user, or should send an error to the client if that user is not found.

```
GET /user
```

This route should return information about the current logged in user, by verifying the token present in `req.headers.Authorization`. If no valid user is found, send an error. 

```
GET /public
```

This should be a route that is accessible by all users (logged in or not). Send some string message as your response, for example "This is a public page". 

```
GET /private
```

This should be a route that is accessible only by *logged in* users.  Send some string message as your response, for example "This is a private page". 

```
GET /readonly
```

This should be a route that is accessible only by users with the `read` capability.  Send some string message as your response, for example "You can read this content". 

```
POST /create
```

Allows a user with the `create` capability to create some record. Note that for the purposes of this lab, you don't have to fully implement this route to actually create a record in your database, just send some string message as your response, for example "You can create content".

```
PUT /update
```

Allows a user with the `update` capability to update some record. Note that for the purposes of this lab, you don't have to fully implement this route to actually update a record in your database, just send some string message as your response, for example "You can update content".

```
DELETE /delete
```

Allows a user with the `delete` capability to delete some record. Note that for the purposes of this lab, you don't have to fully implement this route to actually delete a record in your database, just send some string message as your response, for example "You can delete content".

```
GET /everything
```

This should be a route that is accessible only by users with the `superuser` capability.  Send some string message as your response, for example "You're a super user!". 

## Getting Started

1. Create a new GitHub repository for your lab, or work off of a branch from an existing repository 

2. Get started with a local MongoDB setup or an Mongo Atlas setup (you may use the same database as Lab 13)

   - Note that this will be your development database
   - This database can be empty to start with
   - Create a duplicate "production" database, either through Mongo Atlas or Heroku mLab. Again, this database can be empty to start with

3. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

4. Ensure your directory has the following files at the top level (not in any sub-folders):

   - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

   - `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

   - `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

   - `package.json` with the following scripts:

     ```json
     "start": "node index.js",
     "dev": "nodemon index.js",
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
   	users-model.test.js
   
   /docs
   	swagger.js
   
   /lib
   	server.js
   	/middleware
   		404.js
   		error-handler.js
   		auth.js
   	/models
   		model.js
   		users-schema.js
   	/routes
   		auth-routes.js
   		rbac-routes.js
   ```

7. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation

Your major implementation task will be to build off of your Lab 10 authentication, adding support for Bearer authorization when a user tries to access protected data. 

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

### index.js

This file should be very minimal, only containing the commands to start the server. Remember, we want to write tests for our server, so all server code should go in the module file `lib/server.js`. This will allow our test files to import the server. Therefore, refrain from defining your server in `index.js`.

You will have two different URLs for your MongoDB; one that's your development database and one that's your production database. Use the environment variable `MONGODB_URI` you defined in your `.env` file while developing. The `dotenv` package will allow you to access your `.env` variables. When you deploy your application to Heroku, create a Heroku config variable also named `MONGODB_URI` with the value equal to your product database url.

### lib/server.js

This is your main server file, which defines all the server functionality. This file should export a server object and a start function. It should also assign all the middleware the entire server is using (`404`, `error-handler`, `morgan` and `cors`). Your server should utilize all authentication related routes defined in `auth-router`.

### lib/middleware

In your middleware folder, you should have one file defined for each of the required middleware functions. These files should each export their middleware function. Here's an overview of the required middleware:

#### 404.js

When a client attempts to make a request to a route that is not explicitly defined in `server.js`, the 404 middleware should set the response status to `404` and the response status message to 'Resource Not Found'. You can then choose what you would like to send in the response body; either an error object, an error string, or nothing!

#### error-handler.js

We are now moving away from our 500 error middleware into a more generic middleware function. This function should take in four parameters; `err`, `req`, `res`, `next`. The `err` parameter should be an object with error status code and the error status message. Using this information, send the correct error response to the client.

#### auth.js

This middleware will handle both Basic Authorization and Bearer Authorization. It should be a well developed middleware so that every authentication-related route can call this middleware and have the proper actions executed. Fundamentally, this middleware will read the Authorization string in `req.headers` and will interpret this string to either lead to the creation of a user, find a user, or respond with an error if no user was found.

### lib/models

This folder should include your generic model class, similar to what we built in Lab 04 and Lab 08. It should also include the schema definitions and Mongoose model for users.

#### model.js

This should export a generic model class which takes a Mongoose schema/model as a constructor parameter and defines what MongoDB commands should be called in each CRUD operation.

#### users-schema.js

In this file, you should define a Mongoose schema and export a Mongoose model. Your schema should mimic the below rule-set:

```javascript
{
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  email: { type: 'String' },
  role: {type: 'String', required: true, default: 'user', enum: ['admin', 'editor', 'user']}
}
```

This file should also define `pre` middleware that hashes the user's password before saving the user in the database. You should define a few functions upon the user schema: 

* A `comparePassword` method which compares a plain-text password with the stored hashed password of a user, returning `true` if the passwords match, `false` otherwise.
* A `generateToken` method which will encrypt some user data (typically the user id and/or username) into a JWT. This method should allow you to optionally add an expiry time and a "single use" flag to your token. These values should be passed as optional parameters, loaded from the environment variables. This will allow you to test different token security methods simply by changing the environment variables. 

### lib/routes

#### auth-routes.js

In this file, you should define the route handlers for `/signin`, `/signup` and `/user`, so that they can be imported into `server.js` and help modularize `server.js`. Apply the `auth` middleware to each route.

#### rbac-routes.js

In this file, you should define all your Role Based Access Control routes (`/public`, `/private`, `/readonly`, `/create`, `/update`, `/delete` and `/everything`). These routes should check if a user is logged in via Bearer Authorization (use the auth middleware you created). Based on the logged in user (or lack of logged in user), show the requested content or throw a 403 error. 

Note that there are many ways to implement RBAC. You could have the role capabilities hard coded in your server files, or you could create a new `roles` collection in your database, outlining what roles you have and each role's capabiliites. Whichever route you choose, you should have the following established roles: 

```javascript
[
  { 
    role: "admin", 
    capabilities: ["read", "create", "update", "delete", "superuser"]
  },
   
  { 
    role: "editor", 
    capabilities: ["read", "update"]
  },
  
  { 
    role: "user", 
    capabilities: ["read"]
  },
]
```

To fully test out these routes, note that in your `users` collection on your database, you will need one `admin` user, one `editor` user and one `user` user. Note that this has already been built into your user schema; it's an optional field when creating a user that defaults to `user`. 

### docs/swagger.js

This file should contain your `express-swagger-generator` documentation. See Code Documentation/Cleanliness section of Lab Submission.

### tests

#### server.test.js

In your server test file, use the npm package `@code-fellows/supergoose` to help facilitate testing your Express server. You should test all your defined endpoints, ensuring that the status code, message and returned body (if a body is returned) match expectations.

#### users-model.test.js

This file should test all of the MongoDB operations upon the users model. The tests here should be similar to your Lab 04 and Lab 08 model tests.

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `README.md`, AND you will need to deploy your server application to Heroku. Your deployed Heroku app should be connected to your "production" database instead of your development database.

-   Heroku deployment
    -   Set up automatic deployments on Heroku with your lab repository
    -   Ensure that once deployed, you can use a tool like Postman to access endpoints at your new Heroku URL
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