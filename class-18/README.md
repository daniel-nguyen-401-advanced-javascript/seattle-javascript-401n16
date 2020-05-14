# Class 18 --- Socket.io

## Lecture Videos

[Tuesday](https://www.youtube.com/watch?v=SHL--9Ozhf0) || [Wednesday](https://www.youtube.com/watch?v=ERNROA9feNE)

## Lecture Overview

In this module, we've covered events using the `events` package and TCP data transfer using the `net` package. Our next step is to further improve our data transfer flow using a different package, `socket.io`. This package is a combination of `events` and `net`, allowing for events to be emitted and communicated over a network, instead of just throughout an application.

At the end of this class, you'll be able to:

-   [x] Define a web socket
-   [x] Understand network events
-   [x] Implement a Socket.io server
-   [x] Use events to route incoming messages and payload

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

As we saw with the `net` package, connecting a TCP Socket Connection to a TCP Server is rather straightforward:

```javascript
const net = require('net');
const socket = new net.Socket();

socket.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('Connected to the server on localhost:3000');
});
```

However, when we attempt to emit events and communicate between the connection and the server, we really only have access to the `.write()` function to "emit" a `data` event. Moreover, these are only available on the socket connection, and not the socket server. This leads to some clunky implementation.

Let's improve upon our applications, using **web sockets**. Web sockets follow a communication rule-set (or protocol) also called **WebSocket**, where the communication between the connection and socket server is _bidirectional_, or two-way. Web sockets remain connected during their lifetime, and they are really well suited for real-time data transfer over the web. You can think of web sockets as an improvement of the `net` TCP sockets. Under the hood, the communication is still happening via TCP transfer.

We will be creating web sockets using the packages `socket.io` and `socket.io-client`. These packages are for the socket server and the socket connection (often called the _client_, even though there is no front-end) respectively.

When we used the `net` module, we saw that there was absolutely no use of `http` - even when providing the path to connect to, we refrained from using `http://localhost`, and instead just simply wrote `localhost`. However, the `socket.io` packages do a little bit more for us - because they are geared at creating _web_ sockets, they can take advantage of some of the HTTP protocol benefits. So, `socket.io` does connect the client and server via HTTP _and_ TCP. The TCP layer is for data transfer, and the HTTP layer is to ensure that the connection between the client and server is kept active and authenticated.

So what can you do with `socket.io`? This package makes it very simple to share events between the clients and server, using similar `emit()` and `on()` patterns that the `events` package uses. The `socket.io` package overall exposes a lot of useful functions for event communication! Let's take a look at how the `net` package and `socket.io` package might handle things differently:

#### Net

![Sockets using the `net` module](./assets/net-sockets.png)

#### Socket.io

![Sockets using `socket.io`](./assets/web-sockets.png)

As you can see, `socket.io` does not change too much from the `net` package, but it does allow more specific event emissions as well as allowing the server to emit events to each connected client. This eliminates the need for a socket pool! Overall, `socket.io` simplifies our TCP data transfer, bringing in all the good qualities from the `events` package.

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                                      |
| -------------------------------------------------------------------------- |
| [Web Sockets](https://en.wikipedia.org/wiki/WebSocket)                     |
| [Socket.io Tutorial](https://www.tutorialspoint.com/socket.io/)            |
| [Socket.io vs Web Sockets](https://www.educba.com/websocket-vs-socket-io/) |
| [Socket.io Documentation](https://socket.io/docs/)                         |
| [Socket.io Server API](https://socket.io/docs/server-api)                  |
| [Socket.io Client API](https://socket.io/docs/client-api)                  |
| [Socket Testing Tool](https://amritb.github.io/socketio-client-tool/)      |

### Vocabulary

Familiarize yourself with the following vocabulary terms.

| Term      | Definition                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebSocket | A communication protocol, where the client can talk to the server and the server can talk to the connected clients. This protocol is different from HTTP, but WebSocket is designed to work _over_ HTTP, thus making it compatible with HTTP. All WebSocket communication is done over TCP. |
| socket.io | A package that builds upon the WebSocket protocol, and makes it very seamless to communicate events between clients and servers.                                                                                                                                                            |
| client    | A client in the context of this class is any application that is connecting to a server, with the goal to share data and events over TCP, with connection being maintained over HTTP.                                                                                                       |
| server    | A server in the context of this class is any application that allows multiple clients to connect to it, with the connection maintained over HTTP, and the data transfer happening over TCP.                                                                                                 |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### Creating a Server

```javascript
const sio = require('socket.io');
const port = process.env.PORT || 3000;
const server = sio(port);

server.on('connection', (socket) => {
    console.log('connected to', socket.id);
});
```

#### Connecting a Client

```javascript
const sioc = require('socket.io-client');
const socket = sioc.connect('http://localhost:3000');
```

#### Server-Side Emit

```javascript
server.on('broadcast', handler);
server.emit(
    'broadcast',
    'server-wide event, broadcasted to all connected clients',
);
```

#### Client-Side Emit

```javascript
socket.on('my-event', handler);
socket.emit('my-event', 'socket-wide event, that server can subscribe to');
```

#### Namespace

```javascript
// Server
const specialClients = server.of('/special');

specialClients.on('connection', (socket) => {
    console.log('Welcome special client!');
});

specialClients.emit('message', 'Did you know you were special?');
```

```javascript
// Client
const socket = sioc.connect('http://localhost/special');

socket.on('message', handler);
```

#### Rooms

```javascript
server.on('connection', (socket) => {
    socket.join('my-room');
});

server.to('my-room').emit('room-message', 'Only my room sockets can hear this');
```

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. What does it mean that web sockets are bidirectional? Why is this useful?
2. Does `socket.io` use HTTP? Why?
3. What happens when a client emits an event? What happens when a server emits an event?
