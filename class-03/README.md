# Class 03 --- Data Modeling & NoSQL Databases

## Lecture Videos

[Saturday Morning](https://www.youtube.com/watch?v=sa81H3qaW9Q) || [Saturday Afternoon](https://www.youtube.com/watch?v=h2cE6TgDCd8)

## Lecture Overview

With our knowledge of how to create custom object types using classes, we can now enforce a lot of structure upon our variables and data. Data modeling is the natural extension of this, where we plan in advance how data should be represented in our codebase, and then make the necessary object types to support that plan. By the end of this lecture, you should be able to:

-   [x] Understand the role of data models
-   [x] Define what CRUD operations are
-   [x] Understand the difference between SQL and NoSQL databases
-   [x] Understand how to use MongoDB
-   [x] Understand how to use Mongoose in conjunction with MongoDB
-   [x] Create data models with constraints, type checking and validity checking
-   [x] Understand the MongoDB CLI and useful commands
-   [x] Understand how to test code that relies on a MongoDB database

Prior to class, review the readings below and answer the discussion questions in your canvas reading assignment.

## Reading

What does it mean to "model data"? In the realm of coding, this usually means creating a structure around how data is stored, and having checks built in to enforce that structure. For example, if you have an application that stores your friends' phone numbers, you might want to create a **data model** for a "phone number" instead of just storing strings.

This data model for a phone number would have constraints upon it; it can only store a string of a certain length, containing primarily numeric characters. Then there would be something that checks if a phone number is valid - does it follow the constraints and does it make "sense" as a phone number? Finally, there would be some method of allowing a new phone number to be created such that it follows the constraints. A user could enter in "5553032022", and the data model would enforce that this is stored in a more proper format such as "1 (555) 303 2022". If a use entered in "dog" the data model will reject the input and not create a new entry.

So, data modeling is a more planned and structured approach than simply creating `let`, `const` or `var` variables on the fly. When in the world of data modeling, we want to closely watch and regulate every action that may create or change the data. This leads us to the categorization of "**CRUD**" operations.

-   **C**reate - add a new data entry
-   **R**ead - receive the contents of an existing data entry
-   **U**pdate - change an existing data entry
-   **D**elete - remove an existing data entry

In the example of our phone number data model, every time you create a new phone number, you would call a special `create` function. Every time you read a phone number, you would call a special `read` function, and so on. These special functions place the standard actions of creating and reading onto rails so that they have to follow the defined structure of the data model.

Once we've defined a structure for our data within our JavaScript application, we have to figure out a method for storing that data long-term. This is where a **database** comes in.

When connecting your application to a database, you have a lot of options. Many databases use the **Structured Query Language (SQL)** to store and access data. If you've had experience with Postgres, then you've used an SQL database. There is also the option of using a **non SQL (NoSQL)** database, which doesn't use a standard language but can instead use a variety of languages to access data. The fundamental difference between SQL and NoSQL databases, however, is in how the data itself is stored.

A SQL database can be thought of as more rigid. Everything belongs in defined tables, and you use SQL to filter through those tables.

A NoSQL database does not impose a structure; instead it uses a system of ids to find the data you're looking for. NoSQL databases are handy because they are much more flexible than SQL databases. Many startups have tended towards NoSQL databases because it can support changing needs and it can scale up easily.

In this course, we'll be using the NoSQL database **MongoDB**. The benefits of using MongoDB is that it has a lot of support for JavaScript code, and it stores data in JSON-like documents. We'll also be using the package **Mongoose** as our middleman between our application and our database. Think of Mongoose as a JavaScript translator; our application speaks to Mongoose in JavaScript, and Mongoose translates that into the terms MongoDB understands. Mongoose also adds a lightweight structure and validity checking to our MongoDB, so that we get some of the benefits of an SQL database while actually using a NoSQL database.

With our application using a data model and communicating with its NoSQL database using the package Mongoose, we will be able to create, read, update, and delete data in a structured and error-safe way.

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SQL vs NoSQL (article)](https://www.xplenty.com/blog/the-sql-vs-nosql-difference/)                                                               |
| [SQL vs NoSQL (video)](https://www.youtube.com/watch?v=ZS_kXvOeQ5Y)                                                                               |
| [MongoDB Docs](https://docs.mongodb.com/manual/)                                                                                                  |
| [MongoDB Cheatsheet](../reference)                                                                                                                |
| [Mongoose Docs](https://mongoosejs.com/docs/)                                                                                                     |
| [Data Modeling Explained in 10 Minutes or Less](https://www.credera.com/blog/technology-solutions/data-modeling-explained-in-10-minutes-or-less/) |
| [MongoDB Atlas](https://docs.atlas.mongodb.com/)                                                                                                  |
| [Compass](https://www.mongodb.com/products/compass)                                                                                               |

### Vocabulary

Familiarize yourself with the following vocabulary terms. We will be covering their definitions in class.

| Term                            |
| ------------------------------- |
| database                        |
| data model                      |
| CRUD                            |
| schema                          |
| sanitize                        |
| Structured Query Language (SQL) |
| Non SQL (NoSQL)                 |
| MongoDB                         |
| Mongoose                        |
| record                          |
| document                        |
| Object Relation Mapping (ORM)   |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### A Mongoose Schema

```javascript
const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    level: {
        type: String,
        required: true,
        enum: ['101', '102', '201', '301', '401'],
    },
    currentCourse: { type: String, required: false, lowercase: true },
    gpa: { type: Number, required: false },
});
```

#### Mongoose Built-In CRUD Methods

```javascript
let record = {
    name: 'Sarah Smalls',
    level: '401',
    currentCourse: 'seattle-javascript-401n16',
};

// Create
let newRecord = new schema(record);
let id = newRecord._id;
await newRecord.save();

// Read
let foundRecord = await schema.findById(id);

// Update
foundRecord.gpa = 3.2;
await foundRecord.save();

// Delete
await schema.deleteOne({ _id: id });
```

#### Running Local MongoDB

```
mongod --dbpath=[/PATH/TO/DATA/FOLDER]
```

#### MongoDB Shell Commands

| Command                  | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `mongo`                  | Launch the mongo shell. Once in the shell, you should see `>`               |
| `show dbs`               | Show all the databases                                                      |
| `use db <name>`          | Use the database with name `<name>`                                         |
| `show collections`       | Show all the collections in the current database                            |
| `db.<collection>.find()` | List all the documents / records in the specified collection `<collection>` |
| `db.<collection>.save()` | Save a new document / record to the specified collection `<collection>`     |
| `db.<collection>.drop()` | Completely removes the specified collection `<collection>`                  |

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. Why would a developer choose to make data models?
2. What purpose do CRUD operations serve?
3. What kind of database is Postgres? What kind of database is MongoDB?
4. What is Mongoose and why do we need it?
5. Define three related pieces of data in a possible application. An example for a store application might be Product, Category and Department. Describe the constraints and rules on each piece of data and how you would relate these pieces to each other. For example, each Product has a Category and belongs in a Department.
