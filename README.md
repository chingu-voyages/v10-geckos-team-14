<h1 align="center">
  <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" /> AssistU
    <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" />
</h1>
<h4 align="center">
  On-Demand Household and Personal Services Booking System
</h4>

<h5 align="center"> Live Site:
  <a href="https://assist-u.herokuapp.com">https://assist-u.herokuapp.com</a>
</h5>

<p align="center">
  <a href="#overview" style="color: #8d5a97">Overview</a> •
  <a href="#project-status" style="color: #8d5a97">Project Status</a> •
  <a href="#features-" style="color: #8d5a97">Features</a> •
  <a href="#how-to-use-" style="color: #8d5a97">How to Use</a> •
  <a href="https://github.com/chingu-voyages/v10-geckos-team-14/tree/readmeUpdates#technologies-used-%EF%B8%8F" style="color: #8d5a97">Technologies Used</a> •
  <a href="#design-mockups" style="color: #8d5a97">Design Mockups</a> •
  <a href="#authors" style="color: #8d5a97">Authors</a> •
  <a href="#license-" style="color: #8d5a97">License</a> •
  <a href="#acknowledgments" style="color: #8d5a97">Acknowledgments</a>
</p>

---

## Overview

On-Demand Household and Personal Services Booking System developed during Chingu’s Voyage 10. Chingu is a global collaboration platform that connects motivated learners who have shared goals to learn, help, and build together. Chingu is a Korean word meaning ‘friend.’ As a Chingu, you are a part of a friendly and supportive community of coders, one that has a shared goal of acquiring and refining their skills.

Chingu is a flexible & remote learning program for developers and aspiring developers who want to complete projects and gain experience. We provide deadlines, collaboration experiences, accountability tools, and a friendly community with shared goals.

### Challenge 💪

Typically a six (6) week adventure, Chingu Voyage 10 Team #14's repository was created on July 17, 2019, fourteen (14) days after most Chingu counterparts.  The target is MVP completion approximately twenty-five (25) days after repository creation.

#### Modified Schedule 📆

![Team #14's Schedule](https://github.com/chingu-voyages/v10-geckos-team-14/blob/readmeUpdates/public/images/ChinguV10%20-%20Team%2014.png?raw=true "Team #14's Schedule")

### Motivation

#### AssistU's approach to solving everyday real-life problems

To create a booking platform that facilitates a community.  A place where Clients can improve the overall quality of their lives by finding and utilizing highly trained Fixers to accomplish the unwanted tasks in their lives.  An environment of transparency where Fixers and Clients can communicate their service needs and expectations.  All while creating a new stream of employment and opportunities for Fixers within their communities.

There are many services that the busy working members of the family require most frequently, but do not have sufficient time and or skill set to do it.  Most of the time, it can be a problematic and tedious process to find and hire regular workers.  AssistU solves these problems of the modern households and families by providing the services of skilled and experienced Fixers on a common platform, ensuring the best quality work at the tips of your fingers.  

Experience the convenience of delegating the inconvenient and time-consuming things in your life to a responsible Fixer with AssistU.  Clients can improve the quality of their life and while gaining time back for what matters most in one's life.   Fixers gain the ability to connect one-on-one with their Clients on a single, convenient, and easy to use platform.

#### Technical Motivation

To embrace the opportunity to learn in a collaborative, fully distributed team environment while also motivated to gain experience using popular JavaScript libraries and tools to build a live project that solves real-life problems.  A full-stack application that manages and utilizes significant amounts of data using a NoSQL type database management system.

## Project Status

* AssistU version 1.0.0-alpha released on August 14, 2019.

* AssistU version 1.1.0-alpha is in development and pending release.

## Features 💎

### User Login & Registration

#### Frontend

* New users can register by filling the registration form.
* Already registered users can login to their account by using their registered email address and set password.
* User gets an error message when the provided email address is already associated with a registered user upon submitting registration form.
* Registered users who provide incorrect username login details upon submitting login form receives an error message - "Please enter a registered email."
* Registered users who provide incorrect password  login details upon submitting login form receives an error message - "Please enter the correct password."
* Upon selecting the Confirm Fixer Request button, if the user is not logged in the user is redirected to the login page to log in before continuing.  After a successful login, the user is then redirected to the payment portion of the booking process, without any loss of the provided data entered in the Booking Form.

#### Backend

* User password is stored in most secure method possible, in the form of Hashes with Salts.
* Sessions are created as users log in, and session remains active until the user logs out or clears the browser cookies.
* The User Authentication and Hashing with Salting feature is implemented with the help of [Passport JS](http://www.passportjs.org/)
* Multiple authentication routes created depending on the page in which authentication is initiated.  When authentication begins from any other route except the booking route, the user is redirected, and the Login Successful view is rendered.  However, when successful authentication is initiated from the booking route, the user is redirected, and the payment confirmation view is rendered.

### User-Friendly Booking Procedure

#### Frontend

* Client selects the Service Type and determines their most suitable Fixer form the list of Fixers stored within the Fixers collection.
* Client provides the Service details into the Fixer Booking Form.  Form validation is utilized to ensure the Service Order date, location address, start and stop times, which are required is provided by the user.  Additionally, the Client can provide any Fixer expectations with any information regarding anything they may provide.
* Afterwards the registered users are redirected to confirm payment method and upon confirmation are subsequently redirected to the order confirmation view.

#### Backend

* The user-selected Fixer details from the Fixers' Collection is added as a subDocument within the Order document upon selecting the Fixer of their choice.  In an authenticated session, Client details are also saved, at this time, and added as a subdocument in the Order document.
* Upon selecting the Confirm FixerRequest button, a Post request is sent with all user-provided data in the Booking Form from the frontend to the sever and is saved in the Orders' Collection within the AssistU Database.
* In a non-authenticated session, Client details are added as a subdocument, but only after a successful log-in when the user is redirected back to the Booking view and selects the Confirm Fixer Request button.

### Database Management

* [MongoDB](https://www.mongodb.com/) utilized  for database management with NPM package [Mongoose](https://mongoosejs.com/) for object modelling.
* The MVP release database contains a Fixers' collection that is populated with generated dummy data by [Mockaroo](https://www.mockaroo.com) to create Fixer data aligned with the Fixer Schema.  In future releases, the Fixer collection will be populated with data generated by users registering as Fixers with the information provided within their registration form and Fixer profiles.

### Data Manipulation

* Any user can contact developers by filling out the Contact Form on the landing page.  All user-provided data in the Contact Form is sent via a Post request from the frontend to the sever and is saved in the Contacts' Collection within the AssistU Database.
* Authenticated personalized user greeting with the Client's first name rendered at the top right position of the user's screen.  The users' first name is fetched from the database and concatenated with 'Hi' preceding the username followed by '!'.
* The Booking view is rendered by the user-selected Service Type at which time the Fixers' collection is queried from the database.  The Fixer data is fetched from the DataBase, and details from Fixers' collection are displayed.
* To create the Order History view a database query is conducted within the Orders' Collection for every Order document containing the authenticated Client email address within the Client subDocument to render a list of all associated Client Orders.

## How to Use 🔧

### Getting Started 🚀

1. Clone the project locally.
2. Check if your system has node and MongoDB installed.
3. To check it, type `node --version` for Node and `mongo --version` in your terminal window to check MongoDB is installed.
4. If either of them is not installed in your system, please find the links below for convenience.
   - [Nodejs](https://nodejs.org/en/download/)
   - [MongoDB](https://www.mongodb.com/download-center/community)
5. It is optional, but we recommend using [Robo3T](https://robomongo.org/download) to access the local database and organize it.
6. Once Node and Mongo is installed and running, open `app.js` file in the root folder and find the database connection link with a comment `// for local DB connection ======` and uncomment the next line of code viz. `//mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })` and comment the lines of code meant to connect the app to the live database.
  
### Prerequisites 📋

#### Dev Dependencies

* [body-parser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [ejs](https://www.npmjs.com/package/ejs)
* [ejs-lint](https://www.npmjs.com/package/ejs-lint)
* [express](https://www.npmjs.com/package/express)
* [express-session](https://www.npmjs.com/package/express-session)
* [lodash](https://www.npmjs.com/package/lodash)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [multer](https://www.npmjs.com/package/multer)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [passport](https://www.npmjs.com/package/passport)
* [passport-local](https://www.npmjs.com/package/passport-local)
* [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

### Installation

- `cd` into the root folder through the terminal and type `npm install body-parser db dotenv ejs ejs-lint express express-session lodash mongoose multer nodemon passport passport-local passport-local-mongoose`. This is needed to make sure you don't miss installing any of the required dependency to run this project.

* `cd` into the root directory and type `node app.js` in terminal to start the server and when you get a message saying `server started at 3000`, you are good to go!
* Open `localhost:3000` in your browser and enjoy the project!
* To check the process flow, select any service from the home page, pick a fixer from the list and fill the booking form.
* Register with your Email/password and look into the order history section to see the list of orders you have made in the past.
* You can find `assistuDB in the list of your local databases once you have registered/made any order and collections are created with some real time data in it.
* Go ahead and look into the records saved in `orders` collection to see how subDocuments mentioned above are saved.
* Make it customized as per your requirements and feel free to `fork` if there is any sort of suggestions for the improvement.

## Technologies Used 🛠️

* [HTML](https://www.w3.org/TR/html52/)
* [CSS](https://www.w3.org/Style/CSS/)
* [Bootstrap](https://getbootstrap.com)
* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [EJS -- Embedded JavaScript Templates](https://ejs.co/)
* [NodeJS](https://nodejs.org/)
* [Express](https://www.express.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Heroku Deployment](https://www.heroku.com/)
* [Mockaroo](https://www.mockaroo.com)
* Fonts from [Google Fonts](https://fonts.google.com/)
* Icons from [Font Awesome](https://fontawesome.com/)
* Icons from [FlatIcon](https://www.flaticon.com)
* Icons from [IconFinder](https://www.iconfinder.com/)
* Color Palette Inspiration from [Coolors](https://coolors.co/f1f7f0-63032e-f9d276-8d5a97-e1e3f0)

## Design Mockups

![Design Mockups](https://github.com/chingu-voyages/v10-geckos-team-14/blob/dev/public/images/Small%20-%20README%20Mockup.png?raw=true "Design Mockups")

## Authors

### Chingu Voyage 10 Team #14 🇮🇳 & 🇺🇸

Application designed and implemented by Kathy Lambert and Vaibhav Srivastava.

* **Vaibhav Srivastava** - [GitHub](https://github.com/vai1205)
* **Kathy Lambert** - [GitHub](https://github.com/CodeMeKathy)

## License 📄

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Thank you, [Chance](https://github.com/tropicalchancer) and the Chingu-X Team for giving back and creating [Chingu Organization](https://chingu.io).  This Voyage 10 project is in part a result of your efforts and contributions to the tech industry.

Thank you [FlatIcon](https://www.flaticon.com) and the following Designers for their contributions and your willingness to give back under the [Creative Commons](http://creativecommons.org/licenses/by/3.0/) 3.0:

* Icons made by [Smashicons](https://www.flaticon.com/authors/smashicons)
* Icons made by [Those Icons](https://www.flaticon.com/authors/those-icons)
* Icons made by [Iconixar](https://www.flaticon.com/authors/iconixar)
* Icons made by [Creaticca Creative Agency](https://www.flaticon.com/authors/creaticca-creative-agency)
* Icons made by [PongsakornRed](https://www.flaticon.com/authors/pongsakornred)
* Icons made by [Freepik](https://www.flaticon.com/authors/freepik)
* Icons made by [Kiranshastry](https://www.flaticon.com/authors/kiranshastry)
* Icons made by [Surang](https://www.flaticon.com/authors/surang)

Thank you [IconFinder](https://www.iconfinder.com/) and the following Designers for their contributions and your willingness to give back under the free for commercial use license:

* Icons made by [Krzysztof Kościuszko](https://www.iconfinder.com/Sojtin)
* Icons made by [Riskatyaraa](https://www.iconfinder.com/riskatyara) in the Race To Rise collection
