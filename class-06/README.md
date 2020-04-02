# Class 06 --- HTTP and REST

## Lecture Videos

[Tuesday](https://www.youtube.com/watch?v=0hhppDy88i0) || [Wednesday](https://www.youtube.com/watch?v=c7Fk4lbaMqM)

## Lecture Overview

In this class, we'll be moving to a new module which will cover topics related to web APIs. An **API (Application Programming Interface)** is essentially a collection of commands that let external applications interact with your application. In this module, we will learn how to build our own APIs, and how to allow other applications to exchange information with us or carry out significant data operations.

At the end of this class, you'll be able to:

-   [x] Understand a broad view of the Web Request Response Cycle (WRRC)
-   [x] Understand the difference between clients and servers
-   [x] Understand HTTP operations and REST guidelines
-   [x] Use `json-server` to create a proof of concept API
-   [x] Generate swagger documentation for your API

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

How is data shared over the internet? How does your web browser load websites onto your computer screen? The answer to both these questions is "by using the **Hyper Text Transfer Protocol**" (also known as **HTTP**).

A protocol is a set of rules that must be followed. HTTP was developed as a way for clients and servers to interact over the web in a consistent way. A **client** is anyone asking for/**requesting** data for an end user. A **server** is anyone sending/**responding** with data over the web to a client. This pattern of requests and responses is commonly referred to as the **Web Request Response Cycle (WRRC)**.

![Web Request Response Cycle](./assets/wrrc.png)

Understanding the WRRC is fundamental to knowing how data is shared over the web. HTTP puts rules upon this transfer process, dictating how a request and response should look like. You can think of HTTP as a set of schema for request and response objects, ensuring that anyone using HTTP follows that schema. These schema specify required and optional fields, and utilize some standard enumerated values that HTTP defines.

For example, take a look at what a common client request might look like as a JavaScript object:

```javascript
{
  method: 'GET',
  url: 'http://www.note-taker.com/api/v1/notes',
  headers: {
    Authorization: 'Bearer c93d21e0039f3ab3',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: ''
}
```

The most important pieces of this request are the `method`, `url` and `headers`. The `method` specifies what type of action the client is asking for, and HTTP defines the following possible set of `methods`.

| Request Method | Description                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| GET            | Retrieve a piece of data from the server (either a file, data entry, HTML page, etc.)                                                     |
| POST           | Create a new data entry on the server                                                                                                     |
| PUT            | Update an existing data entry on the server <br />This is a _full_ update, meaning the data entry is entirely replaced by the new content |
| DELETE         | Delete an existing data entry on the server                                                                                               |
| HEAD           | Retrieve only the header of a standard request response<br />This can be useful to get administrative data about the server               |
| CONNECT        | Create a connection link between the client and server                                                                                    |
| OPTIONS        | Get a list of supported HTTP methods this server has coded for                                                                            |
| TRACE          | Used for debugging, this method will complete a loop of the WRRC by passing a message from client to server and back to client            |
| PATCH          | Partially updates a data entry on the server (instead of updating every bit of the entry)                                                 |

The `url` (often called **endpoint**) specifies which server (and what part of that server) to direct the request to. Finally, `headers` provide a lot of administrative information that can enhance security; the client can be very specific about what type of data they're looking for, and the server can enforce that the client have some type of authorization.

When a response is sent back, there is a lot of information included. The most important pieces we usually care about is the response `body`, which is the actual data we asked for, and the response `status` code, a numerical value telling us if the WRRC interaction completed successfully or unsuccessfully. HTTP categorizes different type of status codes and their meanings, and any response sent using HTTP adheres to those status code definitions.

When designing a web API, we must follow the rules of HTTP. We also should follow the _guidelines_ of **Representational State Transfer (REST).** The REST guidelines dictate how to format a server's APIs so that a client can access all the methods / functionality they need.

For example, assume you had a website called `note-taker.com`. On this website, you wanted to allow clients to create, read, update and delete notes (all basic CRUD operations). REST guidelines would help you format URL endpoints to make those client requests:

```
http://www.note-taker.com/api/v1/notes
http://www.note-taker.com/api/v1/notes/12345
```

Let's break these URLs down:

-   `http://` - The protocol being used
-   `www.note-taker.com` - The web server
-   `/api/v1` - This denotes a section of the web server dedicated to sending API responses. REST guidelines describe the format of this path
-   `/notes` - Another REST guideline, this is used to specify what type of data you're attempting to access. You can think of this as being a 1:1 match with a collection in your MongoDB database, though there is no enforced correlation
-   `/notes/12345` - Another REST guideline, specifying that `12345` is the ID of the record you're trying to access

Remember, REST is just a collection of guidelines - there's no enforced limitation on how your API should be structured. It is encouraged to use REST guidelines when building APIs, so that various servers can have some sense of consistency. If every API adopts the same standards, it makes it easier for clients to understand how to use your API!

REST guidelines also call for a standard way to document APIs. Dynamically generated documentation is preferred so that it is always up-to-date with any changes to your API. **Swagger** is a service that makes it very easy to set up dynamically generating documentation for your APIs, so we'll be utilizing Swagger in this course.

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------- |
| [HTTP Protocol Documentation](https://tools.ietf.org/html/rfc7231)                                                   |
| [HTTP and REST](https://www.youtube.com/watch?v=Q-BpqyOT3a8)                                                         |
| [HTTP Basics](https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177) |
| [json-server (npm)](https://github.com/typicode/json-server)                                                         |
| [Star Wars API Docs](https://app.swaggerhub.com/apis/ahardia/swapi/1.0.0#/)                                          |
| [Swagger.io](https://swagger.io)                                                                                     |
| [Swagger Inspector](https://inspector.swagger.io/builder)                                                            |
| [What is REST](https://restfulapi.net/)                                                                              |
| [Swagger Editor](https://editor.swagger.io)                                                                          |
| [HTTP Reference](https://code-maze.com/the-http-reference/)                                                          |
| [REST Reference](https://www.restapitutorial.com/lessons/httpmethods.html)                                           |
| [Swagger Documentation](https://swagger.io/docs/)                                                                    |

### Vocabulary

Familiarize yourself with the following vocabulary terms. We will be covering their definitions in class.

| Term                                    |
| --------------------------------------- |
| server                                  |
| HTTP                                    |
| REST                                    |
| request                                 |
| response                                |
| Web Request Response Cycle (WRRC)       |
| HTTP status codes                       |
| client                                  |
| Application Programming Interface (API) |
| Swagger                                 |
| REST Endpoint                           |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### Example HTTP Request

```bash
POST /api/note HTTP/1.1
Host: api.example.com
Origin: www.example.com
Authorization: Bearer bHVsIHRoaXMgaXMgYSBmYWtlIHNlY3JldCB0b2tlbg==
Accept: application/json
Content-Type: application/json; charset=UTF-8
Content-Length: 58

{"title":"kata","content":"get 100 points on hacker rank"}
```

#### Example HTTP Response

```bash
HTTP/1.1 200 OK
Date: Tue, 22 Aug 2017 06:34:16 GMT
Content-Type: application/json; charset=UTF-8
Content-Encoding: UTF-8
Content-Length: 82
Last-Modified: Mon, 21 Aug 2017 12:10:38 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Connection: close

{"id":"1234123412341324","title":"kata","content":"get 100 points on hacker rank"}
```

#### Common HTTP Status Codes

| Code | Name                          | Meaning                                                                                                                                                                                                                                                                                    |
| ---- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | OK                            | Generic success in sending the response                                                                                                                                                                                                                                                    |
| 201  | Created                       | The request was completed and a new data entry was created on the server                                                                                                                                                                                                                   |
| 202  | Accepted                      | The request has been accepted and an action that has been kicked off but not completed. When the action completes, another response will be sent.                                                                                                                                          |
| 203  | Non-Authoritative Information | The server is a middleman, and received a 200 OK response from its request to another server. Now, when sending a response to the original client, the server will be modifying some of the data it received.                                                                              |
| 204  | No Content                    | The server successfully processed the request and is not returning any content                                                                                                                                                                                                             |
| 300  | Multiple Choices              | The client requested something that was ambiguous; for example they asked for something that is stored in multiple formats, or has a duplicate somewhere. The response does not include the requested data, but instead a list of the possible data entries the client should choose from. |
| 301  | Moved Permanently             | The client requested something from a location that no longer holds that data                                                                                                                                                                                                              |
| 304  | Not Modified                  | The client already requested this data, and the data has not changed since then. Instead of sending the same data again, the server sends nothing with a 304 response status code.                                                                                                         |
| 400  | Bad Request                   | The client made some error when creating the request and so the server can't understand it.                                                                                                                                                                                                |
| 401  | Unauthorized                  | The server wanted the client to provide some authorization for security purposes, but the client did not                                                                                                                                                                                   |
| 403  | Forbidden                     | The client provided authorization, but the server is not willing to give a response (either the authenticated client doesn't have permissions to access this data, or some other reason)                                                                                                   |
| 404  | Not Found                     | The requested data was not found on the server                                                                                                                                                                                                                                             |
| 405  | Method Not Allowed            | The server API doesn't support this method (GET, POST, PUT, DELETE, etc) on this data                                                                                                                                                                                                      |
| 500  | Internal Server Error         | Generic server error                                                                                                                                                                                                                                                                       |
| 501  | Not Implemented               | The request is not recognized by the server and thus can't be completed                                                                                                                                                                                                                    |
| 502  | Bad Gateway                   | The server is also waiting on another server, and never got a response                                                                                                                                                                                                                     |
| 503  | Service Unavailable           | The server cannot handle the request because it is temporarily overloaded or down for maintenance                                                                                                                                                                                          |
| 504  | Gateway Timeout               | The server is also waiting on another server, but it took too long, resulting in a timeout=                                                                                                                                                                                                |

#### Running JSON-Server

```bash
json-server --watch <PATH_TO_JSON_DATA>
```

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. What does protocol mean?
2. How does any web browser understand how to open any webpage?
3. Name one thing a request object _must_ have, and one thing a response object _must_ have
4. What is the difference between HTTP and REST?
5. Why is REST important?
