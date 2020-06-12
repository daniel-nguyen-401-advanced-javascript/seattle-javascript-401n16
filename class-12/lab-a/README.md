# Lab 12 --- OAuth

In this lab, you'll be **working in groups of 2-4 students** to implement OAuth for some chosen third party provider *OTHER THAN* GitHub. Your group must use the provided [starter code](https://github.com/codefellows/seattle-javascript-401n16/tree/master/class-12/lab-a/starter-code) to integrate your OAuth provider, and you must then assess and report on that provider's ease-of-use. 

## Application Overview

This application will be simplistic in nature, allowing users to be created in a temporary (non-persistant) database once they've authorized and logged in via a third party OAuth provider. Possible providers to choose from are: 

* [Auth0](https://auth0.com/)
* [Wordpress](https://developer.wordpress.com/docs/oauth2/)
* [LinkedIn](https://developer.linkedin.com/docs/signin-with-linkedin)
* [Google](https://developers.google.com/identity/protocols/oauth2)

> Want to implement OAuth for a provider not listed above? Feel free to! Most large-scale websites with a sign-in process have OAuth implemented, but not all may expose OAuth endpoints to any application  (especially one running on localhost). 

## Getting Started

1. Create a new GitHub repository for your lab - note that only one person in the group has to do so. The other members should be able to make commits to the repository. 

2. Copy over the [starter code](https://github.com/codefellows/seattle-javascript-401n16/tree/master/class-12/lab-a/starter-code) into your created repository 

3. Add a `README.md` for your lab, using the [`README-TEMPLATE.md` file](../../reference/submission-instructions/labs/README-template.md) as a starting point

4. Ensure your directory has the following files at the top level (not in any sub-folders):

   - `.gitignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.gitignore))

   - `.eslintrc.json` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintrc.json))

   - `.eslintignore` ([template](https://github.com/codefellows/seattle-javascript-401n16/blob/master/configs/.eslintignore))

   - `package.json` with the following scripts:

     ```json
     "start": "node index.js",
     "dev": "nodemon index.js",
     "lint": "eslint **/*.js",
     "test": "jest --verbose --coverage",
     "test-watch": "jest --watchAll --verbose --coverage"
     ```

5. Create a `.env` file which contains the following variables. Define these variables based on the OAuth provider you've chosen. Remember that when you deploy your application to Heroku, you must add these config variables (except for PORT) to your Heroku deployment. 

   ```
   PORT=
   TOKEN_SERVER=
   REMOTE_API=
   CLIENT_ID=
   CLIENT_SECRET=
   API_SERVER=
   ```

6. Create an account / app / credential on your chosen OAuth provider. Each provider has a different path to do this, but typically looking for "setting up a developer application" should point you in the right direction.

   * Make sure your registered application has `http://localhost` as a registered domain AS WELL AS your deployed Heroku URL
   * Configure your OAuth credentials to support a server redirect to `/oauth` on both your local and Heroku URLs

7. Alter the link in `/public/index.html` (line 14) to match your chosen OAuth provider's authorization code link

## Implementation

Your major implementation task will be find the correct enviornment variable values for your chosen OAuth provider, and to modify `/lib/oauth.js` as needed to support your OAuth provider.

You will also see many comments throughout the starter code with `TODO:` at the beginning. Please add your responses to the posed `TODO:` questions or tasks underneath, and change the `TODO:` to `DONE:`. 

> There are many `TODO` comments throughout all the starter code files! Be sure to use a find or find all operation to catch them! 

### Report 

You will also be tasked to write a report (one report per group) about your experiences implementing your chosen OAuth provider. Use the [sample REPORT.md file](https://github.com/codefellows/seattle-javascript-401n16/blob/master/class-12/lab-a/REPORT.md) as your starting point, and replace any content within (and including) the angle brackets (`<`, `>`) with your groups' thoughts. Add this file to your lab repository, and instead of submitting your `README.md`, submit a link to this file in Canvas. 

### Testing

Testing is not required for this lab. 

## Lab Submission

In order to submit this lab, you will need to provide a link to your lab `REPORT.md` (instead of your `README.md`), AND you will need to deploy your server application to Heroku. Your deployed Heroku app should have all needed configuration variables, and show allow OAuth signin and user creation just like your local development version. 

-   Heroku deployment
    -   Set up automatic deployments on Heroku with your lab repository
    -   In your `README.md` be sure to provide a link to your deployed Heroku server
-   `README.md`
    -   Ensure your lab `README.md` is well detailed in how to install and run your application
    -   Provide a link to a pull request from a feature branch into your lab repository's master branch
        -   You can merge the pull request if desired (a link to the PR should still exist)
    -   Provide a [UML diagram](https://www.uml-diagrams.org/index-examples.html) detailing how the modules/files/pieces of your application fit together.
-   Code Documentation / Cleanliness
    -   Ensure that your code is well formatted and passes all lint tests
    -   Answer all `TODO:` comment questions 
    -   Fill in all `TODO:` JSDoc and Swagger comments
        -   [JSDocs Official Documentation](http://usejsdoc.org/about-getting-started.html)
        -   [Swagger Official Documentation](https://github.com/pgroot/express-swagger-generator)
        -   Note that you do not have to generate a JSDoc or Swagger hosted website/url, just the commenting in your code files will suffice
-   Canvas Submission
    -   Submit a link to your lab's `REPORT.md`
    -   Have everyone in the group submit the same link. In your submission, add a comment listing your group members
    -   Once your lab has been graded for the first time, you may resubmit the link to your lab's `REPORT.md` exactly once for a regrade
