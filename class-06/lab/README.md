# Lab 06 --- HTTP and REST

In this lab, you'll work with a very simple server's API, documenting it and testing it.

## Application Overview

You will be building and running a server that allows requests to the following API endpoints:

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

## Getting Started

1. Create a new GitHub repository for your lab

2. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

3. Ensure your directory has the following files at the top level (not in any sub-folders):

    - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

    - `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

    - `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

    - `package.json` with the following scripts:

        ```json
        "start": "node index.js",
        "lint": "eslint **/*.js",
        ```

4. Copy the file [`swagger.json`](https://github.com/codefellows/seattle-javascript-401n16/blob/master/class-06/lab/starter-code/docs/swagger.json) from the course repository and place the copy within a `/docs` subfolder in your lab folder

5. Set up the file structure for this lab according to the following outline:

    > The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

    ```
    .gitignore
    .eslintrc.json
    .eslintignore
    package.json

    /data
    	db.json

    /docs
    	swagger.json
    ```

## Implementation

Your major implementation task will be to fill out the contents of `db.json` and test the swagger documentation generation.

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

### data/db.json

In this file, we will be creating our "database" as simple JSON objects. Because this lab is about getting started with a web server quickly, we will not be going through the path of connecting to a Mongoose/MongoDB database. Keep an eye out for that in later labs as we learn more about writing our own servers!

In this JSON file, create two arrays, `categories` and `products`, each with 2-3 objects inside them. These objects should follow the defined schema below:

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

Once this file has been properly filled out, you should be able to quickly spin up a server using the package `json-server` (installed globally):

```bash
json-server --watch ./data/db.json
```

### docs/swagger.json

The provided `swagger.json` file is just a placeholder and will need to be fully replaced once you generate your Swagger documentation on [Swagger.io](https://swagger.io).

You can use the Swagger Inspector to dynamically build your API documentation. Once generated, publish it to Swagger Hub. From there, you should recieve a YAML file, which you can convert JSON. Once converted paste this JSON into your `swagger.json` file, replacing the file's original content.

Add the Swagger Hub published documentation URL to your `README.md` for this lab.

### Server Validiation

In order to get full points on your lab, your server must pass all the tests present in [this React Application](https://server-validation-lab-06.netlify.com/). Open this website link, and in the form field at the top of the page enter in the URL of your API server (usually in the format http://localhost:8000). Verify that everything is showing green/success.

### Stretch Goal

An optional stretch goal for this lab is to modify the way the API presents output, so that it always responds with an object of the format `{ count, results }`:

```javascript
// response object:
{
  count: 15,   // number of records
  results: [   // collection of records
   	{}, 			 // record 01
    {}         // record 02
  ]
}
```

To implement this, you'll need a `server.js` file which overrides `json-server`'s default server file. You can find instructions and examples of creating your own `server.js` on the [json-server github page](https://github.com/typicode/json-server).

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `README.md`.

-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to install and run your server
        -   Provide the exact `json-server` command needed to run your server using your `db.json`
    -   Provide a link to a pull request from a feature branch into your lab repository's master branch
        -   You can merge the pull request if desired (a link to the PR should still exist)
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your application fit together
    -   Provide a link to your Swagger Hub published documentation page
    -   Provide a screenshot of your server passing when tested on [this React Application](https://server-validation-lab-06.netlify.com/)
-   Testing, code commenting, and deployment is **not required** for this lab
-   Canvas Submission
    -   Submit a link to your lab's `README.md`
    -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade
