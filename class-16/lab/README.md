# Lab 16 --- Event Driven Applications

In this lab, we'll be creating an event driven application that "distributes" logging commands to separate modules. Our application will be called _CAPS_, the Code Academy Parcel Service. CAPS will simulate a delivery service where sellers will ship products and be notified when customer receives those products.

## Application Overview

Your application must simulate the order and delivery of an item, from seller to customer. The seller (or vendor) should alert the system that a package needs to be delivered, and a delivery driver should alert the system when a package is picked up for delivery. The driver should also alert the system when the package has been delivered. Thus, you should have three major events being communicated:

-   `pickup` - Tells the system when a new order needs to be delivered
-   `in-transit` - Tells the system which order is in the process of being delivered
-   `delivered` - Tells the system when the order has been delivered

Your application should automatically generate random orders every 5 seconds. These random orders should have a store, id, customer, and address as the order data.

As an example, here is how your console output might look like for one generated order:

```bash
EVENT pickup
- Time: 05/07/2020 1:30 PM
- Store: My Flower Shop
- OrderID: 1
- Customer: Billy Biggs
- Address: 123 Main Street, New York, NY

DRIVER picked up order 1

EVENT in-transit order 1

DRIVER delivered order 1

VENDOR says: "Thank you for delivering order 1"

EVENT delivered order 1
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
        "test": "jest --verbose --coverage",
        "test-watch": "jest --watchAll --verbose --coverage"
        ```

4. Set up the file structure for this lab according to the following outline:

    > The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

    ```
    .gitignore
    .eslintrc.json
    .eslintignore
    index.js
    package.json

    /_tests_
    	events.test.js

    /lib
    	driver.js
    	events.js
    	vendor.js
    ```

5. Setup GitHub Actions so that your code will be properly tested on each push ([instructions](../../reference/github-actions.md))

## Implementation

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

### index.js

This will be the entry point for your application. It will import all library modules and log out the event payload whenever a `pickup`, `in-transit` or `delivered` event is triggered.

### lib

#### events.js

This should be a very simplistic file, just creating a global event emitter that all other files will import and use.

#### vendor.js

This file should generate a new customer order every 5 seconds. You can utilize the `faker` npm package to generate random order data. When a new customer order is generated, a `pickup` event should emit, and a payload should be sent out with the full order data.

The vendor should also listen for the `delivered` event, and when emitted it should log a thank you message to the console, showing the ID of the order that was delivered.

#### driver.js

This file should represent a delivery driver, and its primary function is to listen for the `pickup` event. When that event is emitted, the driver should emit the `in-transit` event and simulate the delivery process with a timer. Use a timer to wait 3 seconds, and then emit the `delivered` event, passing along the order that was delivered in the payload.

The driver should also console log out the actions it is taking as they occur.

### tests

When writing your tests for events, your primary testing action will be that the handler functions for events are properly being called. So, you can import the same event emitter from `events.js` and manually emit the events `pickup`, `in-transit` and `delivery`. Then, you can spy on your `console.log` function, making sure that it was correctly called and that the correct message was logged out.

#### events.test.js

This file should test the handlers for the `pickup`, `delivered` and `in-transit` events.

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `README.md`. You do not need to deploy to Heroku.

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
-   Canvas Submission
    -   Submit a link to your lab's `README.md`
    -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `README.md` exactly once for a regrade
