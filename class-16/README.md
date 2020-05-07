# Class 16 --- Event Driven Applications

## Lecture Videos

[Tuesday](https://www.youtube.com/watch?v=Y3fEWJ5vecM) || [Wednesday](https://www.youtube.com/watch?v=KTW6Pl-shR4)

## Lecture Overview

In this new module, we'll be talking about real time events and actions, and how your applications can respond to those. Today, we'll start by learning how to raise events in JavaScript, specifically on the backend side. Once an event is raised, we'll see how we can provide a handler function that runs some code in response to the event.

At the end of this class, you'll be able to:

-   [x] Define events
-   [x] Understand the Node event system
-   [x] Understand event driven architecture
-   [x] Implement the observer pattern using publish and subscribe
-   [x] Create a modular, event based system

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

Our last module was an overview of APIs and how they are built with routes, authentication, authorization and data management. We should now have a good understanding of the _Web Request Response Cycle_ - clients make HTTP requests to server endpoints, and these endpoints send responses back to the client.

Now, we're going to take a step away from client-server interactions towards a more broader programming concept: events and listeners.

Many of you might have some familiarity with the term **event**. It is very commonly used in HTML and JavaScript when buttons are clicked or when items on the page are interacted with. Here's an example of how a JavaScript event might be set up:

```html
<form onsubmit="handleSubmit(event)"></form>
```

```javascript
function handleSubmit(event) {
    event.preventDefault();

    let data = event.target[0].value;
}
```

Here, our form will raise an event whenever it is submitted, and it will assign a `onSubmit` **listener**, which will handle the form submission with an **event handler** called `handleSubmit`. The `handleSubmit` function will be given all the event details, and can then access data or methods within the event object in some unique way.

You may have also used events, listeners and handlers in JavaScript when attempting to execute some code when the `window` or `document` changes:

```javascript
window.addEventListener('resize', function () {
    console.log('I am resizing the page!');
});
```

Here, you're asking to add a listener for an event that the window will "raise" or "trigger" when we attempt to resize the window.

So as you can see, events and listeners are very common in programming, and you've already had some familiarity with them before. Now, we're going to learn how to raise events and define listeners in our Node back-end.

Before we dive into how to write our own events, let's take a moment to learn a bit more about how events actually work. In our last class, we talked a bit about a program's **call stack**, which is what lets recursive functions understand where to "return to". The call stack is part of a bigger process which runs for all applications. This process includes new segments, such as **threads**, events, the **event queue** and the **event loop**.

![The Event Loop](./assets/event-loop.png)

When you run your application, each line of your code starts by being pushed onto the call stack. When this line of code is done executing, it is popped off of the stack.

For asynchronous lines of code, (for example getting data from a database, setting a timeout, reading a file, etc.), they also start by being pushed onto the call stack. However, since they can take an unknown amount of time and we don't want our application to be on pause until it's done, JavaScript immediately pops these asynchronous lines of code off of the call stack and onto a separate thread. Before popping, our code usually sends along a callback to be run after the asynchronous command is complete.

> A thread is an external processor that executes code. When you run your applications on a browser, the browser creates new threads. When you run you application in your terminal, Node creates new threads.

When the asynchronous command is complete, the callback is pushed onto another data structure called the event queue. There is a continuous process that runs outside of our application called the event loop. The event loop's sole job is to dequeue things from the event queue, and push them onto the call stack **only when the call stack is empty**. We call it an event loop because it is always checking on the status of the call stack while the application runs (it is looping the same operation `is call stack empty`).

Now, how do events fit into this? Well, we've been calling it the event queue and the event loop, so clearly they must work together in some way. And they do!

Events can be triggered by code in our application, by the ecosystem our application is running in, and more. When an event is triggered, it searches our code for any listeners attached to that specific event. Then, those listeners are enqueued onto the event queue, just like asynchronous callbacks!

> In our code, we can register new events that the system will keep track of. We can also register as many listeners for as many events as we want.

Events and event listeners are handled by the Node `events` module. Like the file system module `fs`, this module is built into Node and does not need to be installed. Instead, to use it, you just need to require the module in your code:

```javascript
const EventEmitter = require('events');
```

When we require the events module, what we get is an exported class called `EventEmitter`. When we think of the term "**emit**", we should think of an event being "**raised**" or "**triggered**". So, this class allows us to both raise new events and to listen to events that have been raised. In order to use this class, we need to create an object from it:

```javascript
const emitter = new EventEmitter();
```

Now that we have an `emitter`, we can start by creating some events and listeners. One thing to note is that order of definition is important; if an event is triggered before we assign its listener, then the listener will never be called.

```javascript
function myEventHandler() {
    console.log('I am handling my event!');
}

function willNotHit() {
    console.log('I will not print this');
}

emitter.on('my-event', myEventHandler);
emitter.emit('my-event');

emitter.on('my-event', willNotHit);
```

So what do we mean when we say "_event-driven applications_"?. Typically this refers to a method of developing your application so that instead of using many callback functions, you instead create events and listeners. The benefit of this approach is that now you can have multiple listeners on a single event - having multiple callbacks however is harder to do and can quickly get very confusing.

Another benefit of event driven applications is _decoupling_ our actions and responses. When we have a callback structure, every time we do an action, all the responding callbacks need to be imported or defined in the same file. We also need to call them in a specific order each time.

For events, it doesn't matter where you emit them; they will search our whole application for listeners. You really don't even need to worry about the listeners! The listeners don't have to be imported into each file that emits an event, and they don't need to be called directly. This can be very useful for large and complex applications.

Events can be a powerful new way to respond to actions within your application. Generally, they're not much different than callbacks or Promise `.then()`. Events just add more flexibility and work well with increasing application complexity.

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                                                  |
| -------------------------------------------------------------------------------------- |
| [Event Driven Programming](https://alligator.io/nodejs/event-driven-programming/)      |
| [Node Documentation: Events](https://nodejs.org/api/events.html)                       |
| [What the Heck is the Event Loop Anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) |
| [Events and Event Emitter in Node.js](https://www.youtube.com/watch?v=l20MBBFZAmA)     |

### Vocabulary

Familiarize yourself with the following vocabulary terms.

| Term                     | Definition                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Observer Pattern         | This is a software design pattern where an object, called the _subject_, has a list of _observers_ that are notified when something about the _subject_ changes. Events follow the Observer Pattern.                                                                                                                                                                           |
| event                    | Events are actions within our application ecosystem that are "raised" or "triggered" either manually within a function, by some user input, or by connections to other services.                                                                                                                                                                                               |
| listener                 | A listener continually waits for a specific event to be raised, and then executes some code (a handler) each time the event is raised.                                                                                                                                                                                                                                         |
| event handler            | An event handler is the code that executes after an event is raised. An event listener will first acknowledge that the event was raised and call an event handler. The content of an event handler can be anything specific to the application and event.                                                                                                                      |
| event driven programming | This is an approach to programming where code emits events instead of using callbacks. While event driven applications can use both events and callbacks in conjunction, this style of programming generally places a preference on emitting events.                                                                                                                           |
| event loop               | The event loop is a continually running process in every application that checks whether the call stack is empty. When the call stack is empty, the event loop pushes the front of the event queue onto the call stack, and then repeats the process of checking for an empty call stack. Through the event loop, programs can have asynchronous processes and event handling. |
| event queue              | The event queue exists throughout the lifetime of your application, and it enqueues callback functions and listeners that need to be run in the call stack. The event queue enqueues these callbacks and listeners when an asynchronous operation ends, or when an event is triggered.                                                                                         |
| call stack               | The call stack is a stack that exists throughout the lifetime of your application. The call stack pushes lines of code that needs to be executed, and pops off lines of code that have completed execution.                                                                                                                                                                    |
| emit / raise / trigger   | These terms refer to the process of saying an event has occurred, causing the event listener to tell the program to run one or more event handler functions.                                                                                                                                                                                                                   |
| thread                   | A thread is a processor for running some lines of code. All modern computers allow for multi-threading - having multiple processors independently running multiple lines of code. The web also allows for multi-threading, allowing multiple web processors to run code at one time.                                                                                           |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### Creating an Emitter

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

#### Assigning a Listener / Handler

```javascript
function myEventHandler() {
    console.log('I am handling my event!');
}

emitter.on('my-event', myEventHandler);
emitter.emit('my-event');
```

#### Event Emitter Functions

We used `on` and `emit` in our examples above, but there are some other very useful `EventEmitter` functions to be aware of. Here is a subset of those functions, but you can find the full list [here](https://nodejs.org/api/events.html#events_event_removelistener).

| Function    | Description                                                                                            | Example Usage                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `on`        | Defines a listener for an event                                                                        | `emitter.on(<event name>, <callback>);`          |
| `off`       | Removes a listener for an event                                                                        | `emitter.off(<event name>, <callback>);`         |
| `emit`      | Raises an event                                                                                        | `emitter.emit(<event name>);`                    |
| `emit`      | Raises an event and passes arguments to any attached listeners                                         | `emitter.emit(<event name>, <event arguments>);` |
| `once`      | Defines a listener that only runs _the first time_ an event is raised. After that, it never runs again | `emitter.once(<event name>, <callback>);`        |
| `listeners` | Returns the listeners (as an array of functions) attached to a specified event                         | `emitter.listeners(<event name>);`               |

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. Given the examples of front-end events such as button click, window resize, form submit, etc, what are some examples of back-end events?
2. Why are events sometimes better than asynchronous actions with callbacks?
3. What does an `EventEmitter` instance do?
4. When is a program's call stack, event queue, and event loop active?
