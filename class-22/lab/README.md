# Lab 22 --- React Testing and Deployment

In this lab, you will be writing unit tests for a counter application, and then deploying the counter application to a variety of places. 

## Application Overview

You will not be creating any application functionality in this lab. Instead, you will be just writing unit tests, adding styling, and deploying. The application code you will be working with is located in the `/starter-code` directory, and is a simple counter akin to what you may have created in Lab 21. 

## Getting Started

For this lab, we will developing locally instead of using a tool like CodeSandbox. Starter code has been provided for you in the `/lab/starter-code` folder.

For this assignment, work locally instead of at Code Sandbox, as you'll need to create testing snapshots, build your docs and view the production build files.

Create a new repository for this assignment, copy the starter-code folder contents into it, and run an npm install to get started.

1. Create a repository for this lab which will hold your `README.md` and UML diagram
2. Ensure your repository has the following file at the top level (not in any sub-folders):

   - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))
3. Copy the contents of [`/lab/starter-code`](https://github.com/codefellows/seattle-javascript-401n16/tree/master/class-22/lab/starter-code) into your created repository
4. Your file structure for this lab should roughly match the following outline:

```
package.json

/__tests__
	Counter.test.js
	App.test.js

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

Your main implementation task for this lab will be to add unit tests for the main components within the starter code. Here's an overview of what you should test for in each file: 

### Counter.test.js

In this file, you should write robust tests for the Counter component. Here are a few things you *must* test: 

* On clicking the `-` button, the state count variable should be decreased by 1 
* On clicking the `+` button, the state count variable should be increased by 1 
* When the state count variable changes, the HTML should update and match that change 

### App.test.js

In this file, you should implement a snapshot test that asserts that the page looks as expected. Be sure that once you generate a snapshot, you are not changing the HTML of the application. If you do change the HTML, you will need to generate a new snapshot. 

## Design Implementation

As you did in Lab 21, this lab should have some custom styling, implemented using SASS. However, in this lab you will have the constraint where you cannot change any of the rendered HTML code - stick with the original application code from the `/lab/starter-code` folder. Utilize any of the existing class names, or rely on the element tag structure when writing your style selectors. Another constraint is that you must attempt to style this counter application *differently* from your Lab 21 counter application. 

### styles.scss (or styles.sass)

In this SASS file, add some styling for the Header, Footer and Counter components. Within your SASS code, you must:

-   Utilize at least one variable (for example `$backgroundColor`)
-   Utilize SASS nesting capabilities
-   Utilize partials so that your style code can be broken up across multiple files. `@use` these partials in your main `styles.scss`/`styles.sass` file

Your styling should pin the Header to the top of the page, and the Footer to the bottom of the page, with the counter in the middle. Some attempt should be made to add styling to the Counter component.

## Deployment

You will need to deploy this counter application to three different services. Be sure to provide links to each deployed site within your `README.md`. 

Before deploying, ensure that you run `npm run build`. The resulting `/build` folder will be what you deploy, not the entire contents of your repo. Include the `/build` folder in your `.gitignore` file, so that it is not committed. 

Here are the three services you must deploy your site to, as well as links to video tutorials for each: 

* Netlify | [Video](https://www.youtube.com/watch?v=sGBdp9r2GSg)
  * Setup Netlify to deploy from your master branch
* AWS S3 | [Video](https://www.youtube.com/watch?v=Kay-UvVCNFs)
  * Manually deploy the `/build` folder contents to a AWS Bucket
  * Set the permissions to public 
  * Enable static website hosting
* AWS Amplify | [Video](https://www.youtube.com/watch?v=DHLZAzdT44Y)
  * Setup Amplify to deploy from your master branch

## Lab Submission

For this lab, you will be submitting a link to your `README.md`, which should have a link to a pull request from your working branch into your master branch. 

-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to run your application
    -   Provide a link to your pull request
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your applications fit together
    -   Provide links to your three deployed sites
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