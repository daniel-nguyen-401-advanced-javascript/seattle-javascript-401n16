# Lab 19 --- Message Queues

In this lab, you'll combine Express servers and sockets, to have a communication network over both HTTP and TCP. This lab will only be focusing on order delivery, and not on order creation or transit. For this lab, you may work in a pair if you would like, just be sure to document that on your submitted README file.

## Application Overview

For this lab, you should have four independent applications running on terminal and communicating with one another. These applications will be:

-   The message queue server (socket server)
-   The delivery API server (socket client, express server)
-   Vendor 01 (socket client)
-   Vendor 02 (socket client)

The delivery API server should expose an HTTP POST route of the format `/delivery/:vendor/:order-id`. This route will not have any body parameters, and when triggered using Postman or a similar service, it should tell the appropriate vendor that an order was delivered. If that vendor happens to be disconnected, the message should be saved and sent when the vendor is back online.

> Note - You do not have to worry about the generation of orders for this lab. Instead, to test your lab, you will just be sending POST requests to your API server with either Vendor 01 or Vendor 02's name, and some random/gibberish `order-id`

As an example, here is how your console outputs might look like for one generated order:

#### Message Queue Server

```
Message Queue Server up and running on 3001
Connected 8Um4-hGsBVGxRK1kAAAA
Connected QFWO_O6ylXOKhwKDAAAB
Connected 21UFwNA3wfUzDenzAAAC
```

#### API Server

```
API Server up and running on 3000
delivery { vendor: 'flower-shop', orderId: '12345-ABCD' }
delivery { vendor: 'candy-shop', orderId: '39201-GHWU' }
delivery { vendor: 'candy-shop', orderId: '93827-TJFC' }
```

#### Vendor Applications

##### Flower Shop Output

```
Thank you for delivering order 12345-ABCDaTRwaf
```

##### Candy Shop Output

```
Thank you for delivering order 39201-GHWU
Thank you for delivering order 93827-TJFC
```

## Getting Started

1. Create a new GitHub repository for your lab, or branch off of an existing lab repository

2. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

3. Ensure your directory has the following files at the top level (not in any sub-folders):

    - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

    - `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

    - `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

4. Set up the file structure for this lab according to the following outline:

    > The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

    ```
    .gitignore
    .eslintrc.json
    .eslintignore

    api.js
    queue-server.js
    vendor-01.js
    vendor-02.js
    ```

Note that in this repo, there are four applications being defined. You can choose to have these applications share a `package.json`, or each belong to their own sub-folder with their own `package.json`. If you have a single `package.json`, be sure to create unique scripts to start each application:

```json
   "start-queue": "node queue-server.js",
   "start-api": "node api.js",
   "start-vendor-01": "node vendor-01.js",
   "start-vendor-02": "node vendor-02.js"
   "lint": "eslint **/*.js"
```

Whichever route you choose, be sure to provide detailed information about how to run your applications in your README file.

## Implementation

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

Note that because this implementation is multiple applications, you will need to run four applications together, and then use a tool like Postman to kick off some delivery POST requests. Be sure to start up your applications in the correct order, or there may be connection issues.

1. `queue-server` needs to be up first so that it can accept socket connections
1. `api-server` needs to be up next to receive POST requests
1. Vendor applications should be started up next to acknowledge deliveries
1. Postman (or a similar tool) should be used to send a delivery POST request to the `api-server`

> Note that because we're using message queues, even if you swap steps 3 and 4, your vendor applications should be able to "catch-up" with any messages they missed.

### queue-server.js

This application will hold your queue server, running on port `3001`. It should store some object/array containing the different queues in the system. When sockets connect to this socket server, a few actions should take place:

-   The server should log to the console a connected message, with the socket id shown
-   The server should attach event listeners upon the socket for the following events:
    -   `received` - indicates that a socket received a message from the server, so that it can be deleted from the server
    -   `getAll` - indicates that a socket wants to get all messages in the queue it's looking for
    -   `subscribe` - indicates that a socket wants to subscribe to a queue. The server will put the socket in its own room
    -   `delivered` - indicates that our API server received a delivery POST request and needs to communicate this to the correct vendor. The queue server will emit another `delivered` event to the correct client

The `delivered` event/message will act as the entry point for the data flow - our API server will emit this event when an HTTP POST request is heard.

### api.js

This application will be both an Express API server running on port `3000` _and_ a socket client connected to the queue server. It should have one primary route defined, `POST /delivery/:vendor/:order-id`. In this route, `:vendor` is the name of the vendor client this delivery pertains to, and `:order-id` is some random collection of letters and digits that represents that order id.

When this POST route is hit with a request, the API server should emit a `delivered` event (which will be handled within the queue server). This even should have a payload with the data that matches the following format:

```javascript
{
  vendor: 'flower-shop',
  orderId: '12345-ABCD'
}
```

It should then return a response of status 200, representing that the delivery was noted in the system.

### vendor-01.js and vender-02.js

You will have two applications representing two different vendors. Note that most of the code between these two will be the same. Think about ways to modularize things so you are being efficient! Each vendor application should have a vendor name attached to it, for example `flower-shop` and `candy-shop`. When these vendor applications start up, they should:

-   Emit a `subscribe` event, indicating that they want to subscribe to a certain queue. This queue is typically equivalent to the vendor name.
-   Register a listener for the `delivered` event, which will check the incoming delivery data and emit a `received` event if the data was successfully received
-   Emit a `getAll` event, indicating that they want to get any messages on the queue they've subscribed to

### tests

Testing is not required for this lab. To visually test that you application is running as expected, follow the below order of operations:

-   Start all applications in the following order
    -   Queue Server
    -   API Server
    -   Vendors
-   Use an application like Postman to send multiple `POST` requests to `/delivery/:vendor/:order-id`. Be sure to send requests for both of your vendors. Examples are:
    -   `POST /delivery/flower-shop/12345-ABCD`
    -   `POST /delivery/candy-shop/45678-FCKE`
-   You should now see that your vendor applications log a thank you message for their own orders. You can now stop one or both of the vendor applications and send more `POST` requests. When you start the applications back up, the vendors should "catch up" to the order deliveries they missed while stopped.

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `README.md`. You do not need to deploy to Heroku.

-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to install and run your applications
    -   Provide a link to a pull request from a feature branch into your lab repository's master branch
        -   You can merge the pull request if desired (a link to the PR should still exist)
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your applications fit together.
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
