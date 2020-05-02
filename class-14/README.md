# Class 14 --- Access Control (ACL)

## Lecture Videos

[Tuesday](https://www.youtube.com/watch?v=qnOicimr2O0) || [Wednesday](https://www.youtube.com/watch?v=OZR7CoAvfwQ)

## Lecture Overview

In the past few classes, we've covered the three major pathways to authentication and authorization: Basic, OAuth and Bearer. Let's take authorization a little further, ensuring that any request a client makes is something that client is _allowed to do_, given the signed in user.

At the end of this class, you'll be able to:

-   [x] Define roles and capabilities
-   [x] Understand the types of access control
-   [x] Implement role based access control
-   [x] Use a mongoose virtual join to import user role capabilities

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

**Access control** means to restrict certain resources from being seen, changed or deleted by certain individuals. Access Controls are implemented everywhere in computer systems. Files can have read, write, and execute permissions, and websites limit access to pages based on the type of a signed in user.

In our RESTful APIs, it is important to limit access to clients based on credentials (username and password). A user can be given a token at signup and login, and that user can pass that token back to the server on requests with limited access controls. Once the server parses the token, it can determine if the user is authorized to preform the request.

Applications of all types have varying degrees of access based on user type and UI requirements.

An application might ...

-   allow **admin** users to create, edit, and delete data, and manage users accounts
-   allow **editor** users to create, edit and delete data, but not see or manage user accounts
-   allow **user** users to read some data, and create, edit and delete their _own_ data
-   allow **guest** users to read some data

These types of users form the collection of user **roles**. Each user role (admin, editor, user, guest, etc) defines what CRUD operations (or **capabilities**) are accessible to that user. These can be model specific, so while one role may allow the creation of product records, it may not allow the creation of category records.

Each of these constraints will have to be handled on both the backend and the frontend of your application. The backend (or API) layer of your application will be authenticating the user credentials and then checking the user's role. It will then determine if the user's role allows for the requested action. Depending on that, the server will either successfully carry out the action or return an error to the client.

We will be tackling the frontend layer of access control in a later class, but the main components here are collecting the credentials from the user, storing the bearer token received from the server, and redirecting to the proper channels when access control is limited.

**Role Based Access Control** is a very common method for implementing access control in API servers. By having two data models (one for users and one for roles), developers can quickly edit, change or increase the number of possible roles without largely affecting user data. There are other methods of access control, as described in the table below:

| Type of Access Control | Description                                                                                                                  | Example                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Mandatory              | A single central authority determines if a user has access on a case-by-case basis.                                          | Confidential (or need-to-know) files in government                   |
| Discretionary          | Whoever owns the data decides which specific users can access it.                                                            | Sharing a Google Doc                                                 |
| Role Based             | Each user has an assigned role, and that role determines what they have access to.                                           | WordPress, or any site that has "admin" users or "guest" users, etc. |
| Rule Based             | Each piece of data has some rules on how and when it can be accessed.                                                        | A limited time code that allows you to access protected content      |
| Attribute Based        | Both data and users have attributes that can change at any time. Whenever there is a request, access is dynamically decided. | Content that is only visible if you're over 18                       |

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------- |
| [RBAC Tutorial](https://www.youtube.com/watch?v=C4NP8Eon3cA)                                                           |
| [5 Steps to RBAC](https://www.csoonline.com/article/3060780/security/5-steps-to-simple-role-based-access-control.html) |
| [Wiki - RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)                                                 |

### Vocabulary

Familiarize yourself with the following vocabulary terms.

| Term                      | Definition                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| access control            | In the fields of physical security and information security, this refers to the selective restriction of access to a place or other resource                                                                                                          |
| role based access control | Role-based access control (RBAC) is a policy-neutral access-control mechanism defined around roles and privileges. The components of RBAC such as role-permissions, user-role and role-role relationships make it simple to perform user assignments. |
| capabilities              | A capability (known in some systems as a key) is a representation of some set of access rights. Typically, these access rights are CRUD operations on a certain model.                                                                                |

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. Why is access control important? Describe an application that would need access control.
2. What is a role used for?
3. Why is role based access control more scalable than discretionary or mandatory access control?
