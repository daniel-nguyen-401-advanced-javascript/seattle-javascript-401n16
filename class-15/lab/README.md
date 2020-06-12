# Lab 15 --- DSA: Trees

This DSA lab is a mix of a code challenge and standard lab. Note that there is no code challenge for this class - use the extra time to catch up on existing labs and to refresh yourself on what was learned from Class 10 - Class 15.

## Application Overview

This application will be the implementation of a BinaryTree and BinarySearchTree class, and any important methods related to that.

## Getting Started

1. Do all your work in a public repository called `data-structures-and-algorithms`, with a well-formatted, detailed top-level `README.md`

   - Your top-level `README.md` should contain a “Table of Contents” navigation to all of your challenges and implementations so far (don’t forget to update it!)


2. Create (or navigate to) a folder within this repository named `data-structures` - you will be working in this folder for this lab

3. Create a new branch in your repo called `tree`

4. On your branch and within the `data-structures` folder, create a sub-folder named `tree` which contains a file called `tree.js` and a local `README.md`

5. Ensure your directory has the following files at the top level (not in any sub-folders):
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

6. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation

### tree.js

In this file, your task will be to create three classes, `Node`, `BinaryTree` and `BinarySearchTree`. All three should be exported by this file.

#### Node

Your Node class should have the following properties:

-   `val` - The value stored in the `Node`
-   `left` - A pointer the left child `Node` in the tree
-   `right` - A pointer to the right child `Node` in the tree

Your Node class does not need to have any functions/methods, though you can add some if you have a use-case for it.

#### BinaryTree

Your BinaryTree class should have the following properties:

* `root` - The `Node` that represents the root of the tree

Your BinaryTree class should have the following functions/methods:

-   `preOrder()` - A function that traverses the tree using preOrder depth-first traversal, and returns an array containing all the values in the traversed order

-   `inOrder()` - A function that traverses the tree using inOrder depth-first traversal, and returns an array containing all the values in the traversed order
-   `postOrder()` - A function that traverses the tree using postOrder depth-first traversal, and returns an array containing all the values in the traversed order

Note that any errors in your BinaryTree class and methods should be well handled and logged. Don't default to the standard thrown error; instead use `try` `catch` blocks to correctly catch errors and log a user-friendly and descriptive message to the console.

#### Binary Search Tree

This class may extend or inherit from the BinaryTree class. 

Your BinarySearchTree class should have the following properties: 

* `root` - The `Node` that represents the root of the tree

Your BinarySearchTree class should have the following functions/methods: 

* `add(val)` - A function that takes in a value as a parameter, and then adds a new `Node` with that value in the correct locations of the binary search tree
* `contains(val)` - A function that takes in a value as a parameter, and returns `true` if that value is in the tree, and `false` if not

#### Stretch Goal

An optional stretch goal for this lab assignment is to implement a class called KaryTree. Create a new branch called `k-ary-tree`, and, using the resources available to you online, implement a k-ary tree, where each node can have any number of children.

#### Testing

Write tests to prove the following functionality:

-   You can successfully instantiate an empty tree
-   You can successfully instantiate a tree and add a single root node 
-   You can successfully add a left and right child to a single root node
-   You can successfully do a preOrder traversal 
-   You can successfully do an inOrder traversal 
-   You can successfully do a postOrder traversal 
-   You can successfully add a value to a binary search tree
-   You can search a binary search tree for a value and get the correct true/false result

Ensure your tests are passing before you submit your solution.

## Lab Submission

- `README.md`

  - In order to submit this lab, you will need to provide a link to your `tree` directory's `README.md`. This `README.md` should be formatted to match the following structure:

    ```markdown
    # Tree Implementation
    
    <!-- Short summary or background information -->
    
    ## Links
    
    <!-- Link to pull request, passing tests, etc -->
    
    ## Challenge
    
    <!-- Description of the challenge -->
    
    ## Approach & Efficiency
    
    <!-- What approach did you take? Why? What is the Big O space/time for this approach? -->
    
    ## API
    
    <!-- Description of each method publicly available to your Tree classes -->
    
    ## Testing
    
    <!-- Description of how to run your tests -->
    ```

  - Alongside creating your `README.md`, create a pull request from your current branch into your master branch. Be sure to add a link to this pull request within your `README.md`!

- Code Documentation / Cleanliness

  -   Ensure that your code is well formatted and passes all lint tests
  -   Ensure that all functions and classes within your code are documented with JSDoc comments
      -   [Official Documentation](http://usejsdoc.org/about-getting-started.html)
      -   [Cheat Sheet](https://devhints.io/jsdoc)
      -   [Style Guide](https://github.com/shri/JSDoc-Style-Guide)
      -   Be descriptive about the purpose of the function / class
      -   Declare data types for parameters and return values
      -   Note that you do not have to generate a JSDoc hosted website, just the commenting in your code files will suffice

- Canvas Submission

  -   Submit a link to your lab's `README.md`
  -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade