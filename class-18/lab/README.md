# Lab 18 --- Socket.io

In this lab, you'll be refactoring your Lab 17 CSPS application yet again, this time pivoting from using the `net` package to using the `socket.io` packages. You will also be implementing some features unique to Socket.io.

## Application Overview

Your application must be able to support multiple users on different machines communicating with one another. Because of this, we're going to be making three distinct applications, and have them all communicate over the internet. These applications will together simulate the order and delivery of an item, from seller to customer. The seller (or vendor) should alert the system that a package needs to be delivered, and a delivery driver should alert the system when a package is picked up for delivery. The driver should also alert the system when the package has been delivered. Thus, you should have three major events being communicated:

-   `pickup` - Tells the system when a new order needs to be delivered
-   `in-transit` - Tells the system which order is in the process of being delivered
-   `delivered` - Tells the system when the order has been delivered

Your client applications should belong to the namespace `csps`.

Your vendor application should automatically generate random orders every 5 seconds. These random orders should have a store name, id, customer, and address as the order data. Your vendor should also join a "room" on your server, so that the vendor only listens to deliveries of their own orders. This room can be identical to the store name, so that two stores of the same name share a room.

As an example, here is how your console outputs might look like for one generated order:

#### CSPS Application

```
connected to socket 001
socket 001 joined room 'flower-shop'

pickup
- Time: 05/07/2020 1:30 PM
- Store: flower-shop
- OrderID: 1
- Customer: Billy Biggs
- Address: 123 Main Street, New York, NY

connected to socket 002
socket 002 joined room 'candy-shop'

in-transit order 1
delivered order 1

pickup
- Time: 05/07/2020 1:32 PM
- Store: candy-shop
- OrderID: 2
- Customer: Sarah Smalls
- Address: 234 Grand Street, New York, NY

in-transit order 2
delivered order 2
```

#### Vendor Application

##### Flower Shop Output

```
Thank you for delivering order 1
Thank you for delivering order 3
```

##### Candy Shop Output

```
Thank you for delivering order 2
Thank you for delivering order 4
```

#### Driver Application

```bash
picked up order 1
delivered order 1
picked up order 2
delivered order 2
picked up order 3
delivered order 3
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

    /csps
    	package.json
    	server.js

    /driver
    	package.json
    	driver.js

    /vendor
    	package.json
    	vendor.js
    ```

    Note that in this repo, there are three applications being defined, each with their own `package.json`. Ensure each `package.json` has scripts that somewhat match the following (`index.js` will have to be replaced with the right file to launch for each application)

    ```json
    "start": "node index.js",
    "lint": "eslint **/*.js"
    ```

## Implementation

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

Note that because this implementation is multiple applications, you will need to run three applications together to fully test this. Be sure to start up your applications in the correct order, or there may be connection issues.

1. `csps` - needs to be up first so that it can accept socket connections
1. `driver` - needs to be up second so that it can connect to the socket server and await orders created from the vendor
1. `vendor` - needs to be up third so that it can connect to the socket server and start creating orders that the driver can respond to

### csps

This application will be your server, allowing client applications to connect to it. Within the application's `server.js` file, you should do the following:

-   Check for connections to the `csps` namespace
-   On connections, it should log out the current socket id
-   It should allow sockets to emit a `join` event that will tell the server to put this socket into a specified room
-   It should log out every event it receives from connected sockets, as shown in the sample console output above
-   It should broadcast `in-transit` and `delivered` events to the vendor sockets in the appropriate room

#### Stretch Goal

An optional stretch goal for this application is to combine the socket functionality with an Express server. Create a quick express server on your csps application that exposes a `/post` route. This route will accept an order in the post body, and then trigger a `pickup` event.

### vendor

Your vendor application will act as a socket client to the CSPS server. In your `vendor.js` file, you should have the following processes implemented:

-   Connect to the CSPS server, in the `csps` namespace
-   Emit a `join` event, with the store name (which will be used as the room name) as the event payload
-   Every 5 seconds, a new customer order will be randomly generated. This order should have a store name, order id, customer name and address. Use the [faker](https://www.npmjs.com/package/faker) package to help generate random values.
-   When a new customer order is generated, emit a `pickup` event, with the generated order as the payload
-   Listen for the `delivered` event from the CSPS server. When you hear that event, look at the payload sent and log a thank you message to the console with the order ID

### driver

Your driver application will act as a socket client to the CSPS server. In your `driver.js` file, you should have the following processes implemented:

-   Connect to the CSPS Socket Server, in the `csps` namespace
-   Listen for the `pickup` event from the CSPS server. When you hear that event, look at the payload sent and simulate picking up the package
    -   Wait one second
    -   Log `picked up order #` to the console
    -   Emit an `in-transit` event with the same order payload passed along
-   Listen for the `in-transit` event. When heard, look at the payload and simulate the delivery of the package
    -   Wait three seconds
    -   Log `delivered order #` to the console
    -   Emit a `delivered` event with the same order payload passed along

### tests

Testing is not required for this lab. To visually test that you application is running as expected, you can use the following sample application: [https://5ctmj.csb.app/](https://5ctmj.csb.app/)

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
