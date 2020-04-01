# Lab 05 --- DSA: Linked List Implementation

This DSA lab is a mix of a code challenge and standard lab. Note that there is no code challenge for this class - use the extra time to catch up on existing labs and to refresh yourself on what was learned from Class 01-Class 05.

## Application Overview

This application will be the implementation of a Linked List class, and any important methods related to that.

## Getting Started

1. Do all your work in a public repository called `data-structures-and-algorithms`, with a well-formatted, detailed top-level `README.md`

    - Your top-level `README.md` should contain a “Table of Contents” navigation to all of your challenges and implementations so far (don’t forget to update it!)

2. Create a folder within this repository named `data-structures` - you will be working in this folder for this lab

3. Create a new branch in your repo called `linked-list`

4. On your branch and within the `data-structures` folder, create a sub-folder named `linkedList` which contains a file called `linked-list.js` and a local `README.md`

5. Ensure your directory has the following files at the top level (not in any sub-folders):

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

6. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation

### linked-list.js

In this file, your task will be to create two classes, `Node` and `LinkedList`. Both should be exported by this file.

#### Node

Your Node class should have the following properties:

-   `val` - The value stored in the `Node`
-   `next` - A pointer the next `Node` in the list
-   `prev` - A pointer to the previous `Node` in the list (for use in stretch goal implementation)

Your Node class does not need to have any functions/methods, though you can add some if you have a use-case for it.

#### LinkedList

Your LinkedList class should have the following properties:

-   `head` - The `Node` that represents the beginning or start of the list

Your LinkedList class should have the following functions/methods:

-   `insert()` - A function that takes any value as an argument and adds a new `Node` with that value to the beginning of the list (before the current `head`

-   `includes()` - A function that takes in a value as an argument and returns true or false if that value was found in the list
-   `toString()` - A function that takes no arguments but prints out a visual representation of the Linked List, similar to the format: `{ a } -> { b } -> { c } -> NULL`

Note that any errors in your LinkedList class and methods should be well handled and logged. Don't default to the standard thrown error; instead use `try` `catch` blocks to correctly catch errors and log a user-friendly and descriptive message to the console.

#### Stretch Goal

An optional stretch goal for this lab assignment is to implement a class called DoublyLinkedList. This class should allow users to do all the same functionality of a LinkedList class, except this time each `Node` will have their `next` and `prev` pointers set. How would the `insert()`, `includes()` and `toString()` functions need to be altered to support this?

#### Testing

Write tests to prove the following functionality:

-   Your LinkedList can successfully instantiate an empty list
-   You can properly insert a value into the list
-   Your LinkedList `head` property will correctly point to the beginning of the list
-   You can insert multiple `Nodes` into the list successfully
-   Your `includes()` function correctly finds a value in the list that exists
-   Your `includes()` function correctly returns false when a value is not in the list
-   Your `toString()` function prints out your LinkedList in an expected way

Ensure your tests are passing before you submit your solution.

## Lab Submission

-   `README.md`

    -   In order to submit this lab, you will need to provide a link to your `linked-list` directory's `README.md`. This `README.md` should be formatted to match the following structure:

        ```markdown
        # Linked List Implementation

        <!-- Short summary or background information -->

        ## Links

        <!-- Link to pull request, passing tests, etc -->

        ## Challenge

        <!-- Description of the challenge -->

        ## Approach & Efficiency

        <!-- What approach did you take? Why? What is the Big O space/time for this approach? -->

        ## API

        <!-- Description of each method publicly available to your Linked List -->

        ## Testing

        <!-- Description of how to run your tests -->
        ```

    -   Alongside creating your `README.md`, create a pull request from your current branch into your master branch. Be sure to add a link to this pull request within your `README.md`!

-   Code Documentation / Cleanliness

    -   Ensure that your code is well formatted and passes all lint tests
    -   Ensure that all functions and classes within your code are documented with JSDoc comments
        -   [Official Documentation](http://usejsdoc.org/about-getting-started.html)
        -   [Cheat Sheet](https://devhints.io/jsdoc)
        -   [Style Guide](https://github.com/shri/JSDoc-Style-Guide)
        -   Be descriptive about the purpose of the function / class
        -   Declare data types for parameters and return values
        -   Note that you do not have to generate a JSDoc hosted website, just the commenting in your code files will suffice

-   Canvas Submission

    -   Submit a link to your lab's `README.md`
    -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade
