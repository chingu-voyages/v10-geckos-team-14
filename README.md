<h1 align="center" style="font-style: italic;">
  <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" /> AssistU
    <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" />
</h1>
<h4 align="center">
  On-Demand Household and Personal Services
</h4>
<h5  align="center"> Live Site:
  <a href="https://assist-u.herokuapp.com">https://assist-u.herokuapp.com</a> </h5>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#project-status">Project Status</a> •
  <a href="#features-">Features</a> •
  <a href="#how-to-use-">How to Use</a> •
  <a href="https://github.com/chingu-voyages/v10-geckos-team-14/tree/readmeUpdates#technologies-used-%EF%B8%8F">Technologies Used</a> •
  <a href="#design-mockups">Design Mockups</a> •
  <a href="#authors">Authors</a> •
  <a href="#license-">License</a> •
  <a href="#acknowledgments">Acknowledgments</a> 
</p>

---

## Overview


On-Demand Household and Personal Services Booking System developed during Chingu's Voyage 10. Chingu is a global collaboration platform that connects motivated learners who have shared goals to learn, help, and build together. Chingu is a Korean word meaning ‘friend.’  As a Chingu, you are a part of a friendly and supportive community of coders, one that has a shared goal of acquiring and refining their skills.

Chingu is a flexible & remote learning program for developers and aspiring developers who want to complete projects and gain experience. We provide deadlines, collaboration experiences, accountability tools, and a friendly community with shared goals.

### Challenge 💪

Typically a six (6) week adventure, Chingu Voyage 10 Team #14's repository was created on July 17, 2019, fourteen (14) days after most chingu counterparts.  The target is MVP completion approximately twenty-five (25) days after repository creation.

#### Modified Schedule 📆

![Team #14's Schedule](https://github.com/chingu-voyages/v10-geckos-team-14/blob/readmeUpdates/public/images/ChinguV10%20-%20Team%2014.png?raw=true "Team #14's Schedule")

### Motivation

There is something motivating about being surrounded by people who are actively working towards the same goals, eager and committed to growth through learning. The opportunity to apply one's technical skills on a team project with pair programming, in a fully distributed, remote, and agile environment.  While also practicing the soft skills and team workflows necessary to thrive in a professional development environment.

## Project Status


This application is in development and pending version 1.0.0-alpha release.

## Features 💎

### 1. Login/Sign-up

#### User End

- New user can Register by filling the registration form.
- Already registered users can login to their account by using their registered email address and password.
- User gets error message when enters an email address that is already registered while filling registration form.
- Two type of error messages maybe received if user enters incorrect details while filling login form. viz  "Please enter registered email" or "Wrong Password Entered"
- User can even login after filling the booking form and can continue the booking process without any loss of data entered in the Booking Form.

#### Technical/Beck End

- User password is stored in most secure possible method, in the form of Hashes with Salts.
- Sessions are created as users login and this session remains created until the user logs out or clear the browser cookies.
- The user authentication and Hashing with Salting Feature is implemented with the help of <a href="[http://www.passportjs.org/](http://www.passportjs.org/)"> Passport JS</a>
- When authenticating from any other route except booking route, "login successful" view is rendered, but when authenticating from booking route, payment confirmation page is rendered after checking if the user is authenticated successfully.

### 2. Select the fixer as per Requirements/Budget

#### User End

- Select the service from the eye pleasing list of services shown on home page.
- From the group of fixers available to serve, user can select one depending upon the budget / description shown by the fixer.

#### Technical/Beck End

- Complete Database is maintained on <a href="[https://www.mongodb.com/](https://www.mongodb.com/)"> MongoDB Atlas
- <a herf = "[https://mongoosejs.com/](https://mongoosejs.com/)"> Mongoose </a> is used for object modelling.
- Fixer data is fetched from the DataBase from the Fixers collection.
- A query is made in the Fixers collection from the database, on the basis of Service selected by the user to display the details of fixers which provide that type of service.
- For the MVP, dummy data for the fixers is entered manually in the fixers collection. Post MVP, the data in the fixer collection will be saved when fixer fills up the registration form.

### 3. Simple Booking Procedure

#### User End

- User can pick the fixer that he/she finds most suitable for the service from the list.
- Enter the date and time when service is required.
- Enter the number of hours for which service is required
- Enter the venue/address where service is required.
- Enter the set of expectations.
- Confirm payment
- Done!

#### Technical/Back End

- All the details entered by the user is taken care by a post request that takes the data to server to get it saved in the orders collection of the database.
- Selected fixer details are added as a subDocument in the same order document.
- If the session is authenticated, the details of client is also saved as the sub document in the same order document, so as to keep a complete track of order.
- If session is not authenticated, client document is added with the order document when client log-in after pressing "Confirm Fixer Request" button on booking page.
- After booking page, once authentication is successful, the payment summery view is rendered. On making a confirmation there, final confirmation page is rendered and order document is updated with the order confirmation signal.

### 4. Order History

#### User End

- User can see the list of orders made in the past with order history feature.

#### Technical/Back End

- A query is done in the orders collection _(where every order document contains the details of client making it, in the form of subDocument)_ with the email address of client that is logged in, to display the list of orders made by the client in the past.

### 5. Experience the presence

#### User End

- Once logged in, users can see their Name on the top of the Screen.

#### Technical/Back End

- Once logged in, the first name of user is fetched from the database and is concatenated with 'Hi' before and '!' after the First Name to show it at top right corner of the app.

### 6. Got a complaint/Query/Suggestion? Post it!

#### User End

- User can fill the contact/enquiry form on home page and submit it to send any sort of Query/Suggestion.

#### Technical/Back End

- Contact form data filled by the user is taken care by a post request which sends the data to server, from where the data is saved in the contactForms collection

## How to Use 🔧

- `CD` into root directory and type `node app.js` in terminal to start the server and when you get a message saying `server started at 3000`, you are good to go!
- Open `localhost:3000` in your browser and enjoy the project!
- To check the process flow, select any service from home page, pick a fixer from the list and fill the booking form.
- Register with your Email/password and look into order history section to see the list of orders you have made in the past.
- You can find `assistuDB in the list of your local databases once you have registered/made any order and collections are created with some real time data in it.
- Go ahead and look into the records saved in `orders` collection to see how subDocuments mentioned above are saved.
- Make it customized as per your requirements and feel free to `fork` if there is any sort of suggestions for the improvement.

### Getting Started 🚀

1. Clone the project locally.
2. Check if your system has node and mongoDB installed.
3. To check it, type `node --version` for Node and `mongo --version` in your terminal window to check mongoDB is installed.
4. If Either of them is not installed in your system, please find here
	- <a herf="[https://nodejs.org/en/download/](https://nodejs.org/en/download/)"> Nodejs
	- <a href="[https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)"> MongoDB</a>
5. It is optional, but we recommend using <a href="[https://robomongo.org/download](https://robomongo.org/download)"> Robo3T</a> to access the local database and organize it.
6. Once Node and Mongo is installed and running, open `app.js` file in the root folder and find the database connection link with a comment `// for local DB connection ======` and uncomment the next line of code viz. `//mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })` and comment the lines of code meant to connect the app to the live database.
  
### Prerequisites 📋

#### Dev Dependencies

- <a href="https://www.npmjs.com/package/body-parser">body-parser</a>
- <a href="[https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)">dotenv</a>
- <a href="[https://www.npmjs.com/package/ejs](https://www.npmjs.com/package/ejs)">ejs</a>
- <a href="[https://www.npmjs.com/package/ejs-lint](https://www.npmjs.com/package/ejs)">ejs-lint</a>
- <a href="[https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)">express</a>
- <a href="[https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)">express-session</a>
- <a href="[https://www.npmjs.com/package/lodash](https://www.npmjs.com/package/lodash)">lodash</a>
- <a href="[https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose)">mongoose</a>
- <a href="[https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer)">multer</a>
- <a href="[https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)">nodemon</a>
- <a href="[https://www.npmjs.com/package/passport](https://www.npmjs.com/package/passport)">passport</a>
- <a href="[https://www.npmjs.com/package/passport-local](https://www.npmjs.com/package/passport-local)">passport-local</a>
- <a href="[https://www.npmjs.com/package/passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)">passport-local-mongoose</a>

### Installation

- `cd` into the root folder through the terminal and type `npm install body-parser db dotenv ejs ejs-lint express express-session lodash mongoose multer nodemon passport passport-local passport-local-mongoose`. This is needed to make sure you don't miss installing any of the required dependency to run this project.

## Technologies Used 🛠️

* [HTML](https://www.w3.org/TR/html52/)
* [CSS](https://www.w3.org/Style/CSS/)
* [Bootstrap](https://getbootstrap.com)
* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* Embedded JavaScript Templates 
* NodeJS
* Express
* MongoDB with NodeJS Mongoose NPM package utilized for database management
* Fonts from [Google Fonts](https://fonts.google.com/)
* Icons from [Font Awesome](https://fontawesome.com/)
* Color Palette Inspiration from [Coolors](https://coolors.co/f1f7f0-63032e-f9d276-8d5a97-e1e3f0)
* Heroku Deployment

## Design Mockups

* TBD

## Authors

### Chingu Voyage 10 Team #14 🇮🇳 & 🇺🇸

Application designed and implemented by Kathy Lambert and Vaibhav Srivastava.

* **Vaibhav Srivastava** - [GitHub](https://github.com/vai1205)
* **Kathy Lambert** - [GitHub](https://github.com/CodeMeKathy)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thank you [Chance](https://github.com/tropicalchancer) and the Chingu-X Team for giving back and creating [Chingu Organization](https://chingu.io).  This Voyage 10 project is in part a result of your efforts and contributions to the tech industry.
