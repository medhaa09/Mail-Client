
# Mail Client

This is a mail client with the features of composing a mail and also filtering mails by read, unread and favourites, including the login logout and signup functionality.
## Demo
A demo of the working web-app can be viewed by visiting: https://mailclienttask.netlify.app/
## To run locally
Make sure you have Node.js and npm installed on your machine.
Clone the project
```bash
git clone https://github.com/medhaa09/Mail-Client.git
```

Go to the project directory
```bash
cd Email-Client
```

Install dependencies
```bash
npm install
```
Start the backend go server to connect to the database
```bash
cd backend
```
```bash
 go run main.go
```
Change the port settings according to your convenience main.go

Now, run the webpage on localhost by:
```bash
cd ..
```
```bash
cd src
```
```bash
npm start
```
##Structure of Code
backend folder contains three folders:
1. Auth: handlers.go contains the functions needed for authentication.
2. Models: models.go contains the user struct and the email struct for storing data in the database.
3. Store: store.go contains the functions for storing the data in the database and functions for signup and login.
4. main.go file defines all the backend routes.
frontend:
src folder contains:
components: contains all the components with their styling
homepage: component being rendered on the homepage

