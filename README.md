# Gdocs presence app frontend 

The frontend of the gdocs presence app is built using react js.

 ### The architecture is as follows
 
 ![image](https://user-images.githubusercontent.com/24207790/88471236-68aa8780-cf24-11ea-9c55-33bdc7b5d5c1.png)

# Feature list

  - Login
  - Register
  - View file list
  - Create dummy file
  - View dummy file
  - View other users 
### Login
In login the react app uses the /login endpoint to send user credentials to the node js where the password is hashed using the node js crypto library and compared the to the hash in the db.

### Register
In register the credentials are sent to the /register endpoint where the password is hashed, a unique id is generated and the credentials are added to the database

### View file list

Here we send a GET request to /document which retrieves all the documents available and returns is at the response body in the form of an array.

### Create dummy file

We use the /document/create endpoint to create the new file.

### View file

When we view the file we use the /document/users endpoint to get the list of availble users for that particular document.

## How the Presence system works

For the presence system I have implemented a custom polling system which consist of 3 parts:
- getFileUserService
- activePollingService
- cleanupService

#### getFileUserService

This service gets the number of active users on a particular file. The API is called at an interval of 1 second.

#### activePollingService

This service is called to tell the server the client is alive and is called every 2 seconds

#### cleanupService

This service is called to tell the server to check for any inactive users an clean up accordingly.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
