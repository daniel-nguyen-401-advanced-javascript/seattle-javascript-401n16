# Lab 21 --- Component Based UI

In this lab, you'll be writing your first stateful React application. This application will use component based UI ideology to create modular React classes / functions.

## Application Overview

Take a look at the sample implemented solution, viewable here.

[Sample Implementation](https://seattle-js-401n16-lab-21.netlify.app/)

Your application should implement the same basic functionality, though note that other pieces such as styling, layout, text content, etc. can be completely up to you! Here are the major functionality pieces:

-   Header and footer elements with some styling and text
-   An increment count button which adds 1 to the current count
-   A decrement count button which subtracts 1 from the current count
-   A current count display that is initialized at 0 and updates as the count changes

## Getting Started

For this lab, we will be using [CodeSandbox](http://codesandbox.io) to code and run your React application. This is primarily to speed up grading!

1. Create a repository for this lab which will hold your `README.md` and UML diagram
2. Navigate to [CodeSandbox](http://codesandbox.io), and create an account, preferrably linked to your class GitHub account
3. Click on "Create Sandbox", and choose the React template from the provided list
4. You should then be directed to a code editor with all the necessary starter files
5. You may optionally link this CodeSandbox project to your created repo from step 1
6. On the left hand side, click the "Add dependency" button and add `node-sass` as a dependency
7. Set up the file structure for this lab according to the following outline:

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

```
package.json

/public
	index.html

/src
	/components
		Header.js
		Footer.js
		Counter.js
	App.js
	styles.scss
	index.js
```

## Code Implementation

> The following outline below is a suggested implementation. Note that your lab does NOT have to constrain itself to these suggestions; there are many ways to code an application and we encourage creativity and unique approaches! This suggested implementation is primarily for anyone who is having trouble knowing where/how to start.

### index.js

This file should in most cases be left unchanged.

### App.js

This will be the main content container for your application. In this file, you should import your Header, Footer and Counter components and display them in some order/layout. You may also add additional HTML within this component's render function. Because this component does not need to maintain state, consider making it a functional component instead of a class component.

This file should also import your SASS styles from `styles.scss`.

### components/Header.js

This component will represent the header of your application. You can be creative here with the contents of the component. Some possible ideas are to provide your name, class code, lab number, etc. See the Design Implementation guidelines for specifics on style requirements for this component. Because this component does not need to maintain state, consider making it a functional component instead of a class component.

### components/Footer.js

This component will represent the footer of your application. You can be creative here with the contents of the component. Some possible ideas are to provide the current date, copyright information, your contact information for hiring managers, etc. See the Design Implementation guidelines for specifics on style requirements for this component. Because this component does not need to maintain state, consider making it a functional component instead of a class component.

### components/Counter.js

This component will implement a counter, complete with an increment and decrement button, as well as something to display the current count. Initialize the counter to start at 0, and increase/decrease the count when the buttons are clicked. Ensure that the display of the current count updates on the webpage. This component will need to maintain a state, so make it a class component.

### tests

No testing is required for this lab.

### Stretch Goals

In your Counter component, instead of having the current count plainly printed, make it print inside of an editable form input field. When a user edits this field, the current count should update to the entered number.

## Design Implementation

Because this is a front end application, we will also be adding design implementation requirements to your lab. These design requirements should be coded in SASS (.scss or .sass) only, not CSS. Be creative with these requirements to fully flex your front end design skills!

### styles.scss (or styles.sass)

In this SASS file, add some styling for the Header, Footer and Counter components. Within your SASS code, you must:

-   Utilize at least one variable (for example `$backgroundColor`)
-   Utilize SASS nesting capabilities

Your styling should pin the Header to the top of the page, and the Footer to the bottom of the page, with the counter in the middle. Some attempt should be made to add styling to the Counter component.

### Stretch Goal

When the Counter's current count becomes negative, change the Counter component style to reflect this (for example, perhaps make the current count show up in red). Be sure to revert back to the original style when the current count becomes positive again.

## Lab Submission

For this lab, you will be submitting a link to a `README.md` as usual, though this will contain a link to your CodeSandbox implementation instead of your PR.

-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to run your application
    -   Provide a link to your CodeSandbox project
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your applications fit together.
-   Code Documentation / Cleanliness
    -   Ensure that your code is well formatted
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
