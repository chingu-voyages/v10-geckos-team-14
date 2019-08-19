<h1 align="center" style="	font-family: 'Fredoka One', cursive">
  <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" /> <span style="font-style: italic; color: #63032e;"> AssistU </span>
    <img src="https://github.com/chingu-voyages/v10-geckos-team-14/blob/master/public/favicon-32x32.png?raw=true" alt="AssistU Logo" />
</h1>
<h4 align="center" style="font-style: italic; color: #63032e;
	font-family: 'Fredoka One', cursive">
  On-Demand Household and Personal Services Booking System
</h4>
<h5  align="center" style="font-style: italic; color: #63032e;
	font-family: 'Domine', serif"> Live Site:
  <a href="https://assist-u.herokuapp.com" style="color: #8d5a97">https://assist-u.herokuapp.com</a> </h5>

<p align="center" style="font-style: italic; color: #63032e;
	font-family: 'Domine', serif">
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
* Upon selecting the Confirm FixerRequest button, if the user is not logged in the user is redirected to the login page to log in before continuing.  After a successful login, the user is then redirected to the payment portion of the booking process, without any loss of the provided data entered in the Booking Form.

#### Backend

* User password is stored in most secure method possible, in the form of Hashes with Salts.
* Sessions are created as users log in, and session remains active until the user logs out or clears the browser cookies.
* The User Authentication and Hashing with Salting feature is implemented with the help of [Passport JS](http://www.passportjs.org/)
* Multiple authentication routes created depending on the page in which authentication is initiated.  When authentication begins from any other route except the booking route, the user is redirected, and the Login Successful view is rendered.  However, when successful authentication is initiated from the booking route, the user is redirected, and the payment confirmation view is rendered.

### 2. Select the fixer as per Requirements/Budget

#### Frontend

- Select the service from the eye pleasing list of services shown on home page.
- From the group of fixers available to serve, user can select one depending upon the budget / description shown by the fixer.

#### Technical/Beck End

- Complete Database is maintained on <a href="[https://www.mongodb.com/](https://www.mongodb.com/)"> MongoDB Atlas
- <a herf = "[https://mongoosejs.com/](https://mongoosejs.com/)"> Mongoose </a> is used for object modelling.
- Fixer data is fetched from the DataBase from the Fixers collection.
- A query is made in the Fixers collection from the database, on the basis of Service selected by the user to display the details of fixers which provide that type of service.
- For the MVP, dummy data for the fixers is entered manually in the fixers collection. Post MVP, the data in the fixer collection will be saved when fixer fills up the registration form.

### 3. Simple Booking Procedure

#### Frontend

- User can pick the fixer that he/she finds most suitable for the service from the list.
- Enter the date and time when service is required.
- Enter the number of hours for which service is required
- Enter the venue/address where service is required.
- Enter the set of expectations.
- Confirm payment
- Done!

#### Backend

- All the details entered by the user is taken care by a post request that takes the data to server to get it saved in the orders collection of the database.
- Selected fixer details are added as a subDocument in the same order document.
- If the session is authenticated, the details of client is also saved as the sub document in the same order document, so as to keep a complete track of order.
- If session is not authenticated, client document is added with the order document when client log-in after pressing "Confirm Fixer Request" button on booking page.
- After booking page, once authentication is successful, the payment summery view is rendered. On making a confirmation there, final confirmation page is rendered and order document is updated with the order confirmation signal.

### 4. Order History

#### Frontend

- User can see the list of orders made in the past with order history feature.

#### Backend

- A query is done in the orders collection _(where every order document contains the details of client making it, in the form of subDocument)_ with the email address of client that is logged in, to display the list of orders made by the client in the past.

### 5. Experience the presence

#### Frontend

- Once logged in, users can see their Name on the top of the Screen.

#### Backend

- Once logged in, the first name of user is fetched from the database and is concatenated with 'Hi' before and '!' after the First Name to show it at top right corner of the app.

### 6. Got a complaint/Query/Suggestion? Post it!

#### Frontend

- User can fill the contact/enquiry form on home page and submit it to send any sort of Query/Suggestion.

#### Backend

- Contact form data filled by the user is taken care by a post request which sends the data to server, from where the data is saved in the contactForms collection

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

* <a href="https://www.npmjs.com/package/body-parser">body-parser</a>
* <a href="https://www.npmjs.com/package/dotenv">dotenv</a>
* <a href="https://www.npmjs.com/package/ejs">ejs</a>
* <a href="https://www.npmjs.com/package/ejs-lint">ejs-lint</a>
* <a href="https://www.npmjs.com/package/express">express</a>
* <a href="https://www.npmjs.com/package/express-session">express-session</a>
* <a href="https://www.npmjs.com/package/lodash">lodash</a>
* <a href="https://www.npmjs.com/package/mongoose">mongoose</a>
* <a href="https://www.npmjs.com/package/multer">multer</a>
* <a href="https://www.npmjs.com/package/nodemon">nodemon</a>
* <a href="https://www.npmjs.com/package/passport">passport</a>
* <a href="https://www.npmjs.com/package/passport-local">passport-local</a>
* <a href="https://www.npmjs.com/package/passport-local-mongoose">passport-local-mongoose</a>

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
* [MongoDB](https://www.mongodb.com/) with NPM package [Mongoose](https://mongoosejs.com/) utilized for database management
* [Heroku Deployment](https://www.heroku.com/)
* Fonts from [Google Fonts](https://fonts.google.com/)
* Icons from [Font Awesome](https://fontawesome.com/)
* Icons from [FlatIcon](https://www.flaticon.com)
* Color Palette Inspiration from [Coolors](https://coolors.co/f1f7f0-63032e-f9d276-8d5a97-e1e3f0)


## Design Mockups

![Design Mockups](https://github.com/chingu-voyages/v10-geckos-team-14/blob/dev/public/images/Small%20-%20README%20Mockup.png?raw=true "Design Mockups")

## Authors

### Chingu Voyage 10 Team #14 🇮🇳 & 🇺🇸

Application designed and implemented by Kathy Lambert and Vaibhav Srivastava.

* **Vaibhav Srivastava** - [GitHub](https://github.com/vai1205)
* **Kathy Lambert** - [GitHub](https://github.com/CodeMeKathy)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thank you, [Chance](https://github.com/tropicalchancer) and the Chingu-X Team for giving back and creating [Chingu Organization](https://chingu.io).  This Voyage 10 project is in part a result of your efforts and contributions to the tech industry.

Thank you FlatIcon and Designers for:

* Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
* <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/creaticca-creative-agency" title="Creaticca Creative Agency">Creaticca Creative Agency</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/pongsakornred" title="pongsakornRed">pongsakornRed</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
* <div>Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"             title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
