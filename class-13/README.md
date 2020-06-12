# Class 13 --- Bearer Authorization

## Lecture Videos

[Saturday Morning](https://www.youtube.com/watch?v=GBrE-KUKUPQ) || [Saturday Afternoon](https://www.youtube.com/watch?v=9gNF6JMqBys)

## Lecture Overview

We've now covered a simple process to get a user to sign up with a username and password, and then verify that user on subsequent sign-ins. We also reviewed how to have a third party connect to our application, so that our users can "sign in" with their existing third party account. This process was our first introduction to an idea of an "access token" - an encrypted string that represents a signed-in user. In this class, we'll dive into the idea of tokens even more, and find out how to make our own. 

At the end of this class, you'll be able to:

-   [x] Describe Bearer Authentication
-   [x] Understand the use of JSON Web Tokens (JWT)
-   [x] Understand when to use Basic or Bearer Authentication 
-   [x] Understand how to verify tokens

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

After a user has signed in (either by Basic Authentication or OAuth), your server should have some reference to the current user as stored in the server's database. Now, as the user continues to navigate our website, making more and more requests to the server, our server should have some way of "remembering" this authenticated user. Instead of having the user continually send their username and password over the internet, or undergo the long OAuth process, the server creates an encrypted **token** for the user to send instead. 

This token is referred to as a "**Bearer token**", because this encrypted value "**bears**" or "contains" information that will let the server understand which user the client represents. They also contain enough information to make the server confident that this client successfully went through the authentication process, and is not a "bad actor" like a hacker or identity thief. 

Upon receiving a Bearer token from a client, the server decrypts it, inspects the resulting JSON object, takes data from that object to look up the appropriate user, and then accesses the requested user data. In order for a server to successfully do this, the client must send the Bearer token within their request authorization header. 

So how are tokens made? While there are many encryption methods out there, a common way to generate tokens is to use the **JSON Web Token (JWT)** standard. This standard defines a compact and self-contained way to securely transmit information between two systems (servers, clients, etc.) as a JSON object. This information can be verified and trusted because it is "digitally signed". This signing process uses a **secret** **key** that only the server knows.

While we've been referring to tokens as encrypted strings, JWTs are not as fully secure as a standard encrypted string using an encryption algorithm. So there is still a slight risk that the content encrypted could be hacked into. Because of this, we try not to put any sensitive user data (such as a password) into the JWT. Typically, the server only stores either the user's unique username, or the id of the user record within the server's database. 

JWTs should be used for authorization after the user has logged in once. JWTs are also a good way to securely transfer information between two applications. Even though JWTs use a lighter form of encryption, they are still pretty tough to crack! 

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                        |
| ------------------------------------------------------------ |
| [JWTs Explained](https://www.youtube.com/watch?v=926mknSW9Lo) |
| [Intro to JWT](https://jwt.io/introduction/)                 |
| [Are JWTs Secure?](https://stackoverflow.com/questions/27301557/if-you-can-decode-jwt-how-are-they-secure) |
| [NPM JSON Web Token Documentation](https://www.npmjs.com/package/jsonwebtoken) |

### Vocabulary

Familiarize yourself with the following vocabulary terms.

| Term           | Definition                                                   |
| -------------- | ------------------------------------------------------------ |
| encryption     | Encryption is the method by which information is converted into a secret code that hides the information's true meaning. During encryption, a secret key is used to make sure that only those parties with the secret key can later decrypt the code. Encryption is commonly used to protect data in transit. |
| token          | In general, a token is an object that represents something else, such as another object. In the world of authentication, a token typically is an encrypted string that represents a signed in user. |
| bearer         | This refers to a client bringing a token to a server.        |
| secret         | A unique string that only a few parties know (in our case, just the server knows). Because it can be used to decrypt sensitive information, the secret should be kept protected or well hidden. |
| JSON Web Token | A package that lets us lightly encrypt data as a JSON object. |
| key            | A value that lets us decrypt an encrypted string. Typically this is kept secret. |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### Create JWT

```javascript
let token = jwt.sign(userData, SECRET); 
```

#### Create JWT with Timeout

```javascript
let token = jwt.sign({
  exp: expiryDate
  data: userData
}, SECRET); 
```

#### Verify JWT

```javascript
let decryptedToken = jwt.verify(token, SECRET);
```

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. When is Basic Authorization used vs. Bearer Authorization? 
2. What does the JSON Web Token package do?
3. What considerations should we make when creating and storing a `SECRET`? 