//========================================APP DEPENDENCIES===============================================

const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const _ = require('lodash')
const multer = require('multer')
const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false
	})
)
app.use(passport.initialize())
app.use(passport.session())

//========================================DATABASE CONNECTIONS===========================================

// for local DB connection ============================================================
mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })

//for live DB connection ============================================================
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//========================================DATABASE SCHEMAS===============================================

const clientSchema = new mongoose.Schema({
	username: String,
	password: String,
	clientFirstName: String, // TODO (Post MVP): - [ ] Include validation to accept only 5-6 characters
	clientLastName: String,
	clientStreetAddress1: String,
	clientStreetAddress2: String,
	clientCity: String,
	clientState: String,
	clientCountry: String,
	clientZip: Number,
	clientMobileNo: String
	//clientProfileImage: String
})
clientSchema.plugin(passportLocalMongoose)
const fixerSchema = new mongoose.Schema({
	fixerName: String,
	fixerCompanyName: String,
	fixerEmail: String,
	fixerMobileNo: Number,
	fixerDescription: String,
	fixerFee: Number,
	fixerRating: String,
	//fixerImage: String,
	fixerService: String,
	fixerStreetAddress1: String,
	fixerStreetAddress2: String,
	fixerCity: String,
	fixerState: String,
	fixerCountry: String,
	fixerZip: String
})
const orderSchema = new mongoose.Schema({
	orderClient: clientSchema,
	orderService: String,
	orderFixer: fixerSchema,
	orderServiceHours: Number,
	orderCost: Number,
	orderStreetAddress1: String,
	orderStreetAddress2: String,
	orderCity: String,
	orderState: String,
	orderCountry: String,
	orderZip: String,
	orderRating: Number,
	orderFixerExpectations: String,
	orderClientResponsibilities: String,
	orderDate: String,
	orderWorkDate: Date,
	bookingCashConfirm: Boolean,
	//orderImage: String
})
const contactUsSchema = new mongoose.Schema({
	contactEmail: { type: String, required: [true, 'This is a compulsory field'] },
	contactSubject: { type: String, required: [true, 'This is a compulsory field'] },
	contactMessage: { type: String, required: [true, 'This is a compulsory field'] }
})

//========================================MODALS=========================================================

const Contact = mongoose.model('Contact', contactUsSchema)
const Fixer = mongoose.model('Fixer', fixerSchema)
const Order = mongoose.model('Order', orderSchema)
const Client = mongoose.model('Client', clientSchema)
passport.use(Client.createStrategy())
passport.serializeUser(Client.serializeUser())
passport.deserializeUser(Client.deserializeUser())

//========================================VARIABLE DECLARATIONS==========================================

var formCheck = false
var loginErrorCheck = false
var registerErrorCheck = false
var loginError
var registerError
var fixers = []
var serviceType
var selectedFixer
var selectedFixerFee
let workHours = 1
let calcFee = 1
var navCheck = false
var clientDisplayName
var fromBookingPage = false
var thisOrder

//=============================================GET REQUESTS==============================================

//Get request: HOME PAGE=============================================
app.get('/', function(req, res) {
	Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
		if (formCheck) {
			formCheck = false
			if (foundClient) {
				res.render('thanks', {
					navCheck: navCheck,
					clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
				})
			} else {
				res.render('thanks', {
					navCheck: navCheck,
					clientDisplayName: ' '
				})
			}
		} else {
			if (foundClient) {
				res.render('home', {
					navCheck: navCheck,
					clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
				})
			} else {
				res.render('home', {
					navCheck: navCheck,
					clientDisplayName: ' '
				})
			}
		}
	})
})
//Get request: BOOKING PAGE=============================================
app.get('/booking', function(req, res) {
	Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
		if (foundClient) {
			res.render('booking', {
				fixerData: fixers,
				serviceType: serviceType,
				navCheck: navCheck,
				clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
			})
		} else {
			res.render('booking', {
				fixerData: fixers,
				serviceType: serviceType,
				navCheck: navCheck,
				clientDisplayName: ' '
			})
		}
	})
})
//Get request: LOGIN PAGE=============================================
app.get('/login', function(req, res) {
	if (loginErrorCheck) {
		loginErrorCheck = false
		res.render('login', {
			errorMessage: loginError
		})
	} else {
		res.render('login', {
			errorMessage: ' '
		})
	}
})
//Get request: REGISTER PAGE=============================================
app.get('/register', function(req, res) {
	if (registerErrorCheck) {
		registerErrorCheck = false
		res.render('register', {
			errorMessage: 'Email already registered!'
		})
	} else {
		res.render('register', {
			errorMessage: ' '
		})
	}
})
//Get request: PAYMENT PAGE=============================================
app.get('/payment', function(req, res) {
	if (req.isAuthenticated()) {
		navCheck = true
		Order.findById(thisOrder, function(err, foundOrder) {
			res.render('payment', {
				fixerCompanyName: foundOrder.orderFixer.fixerCompanyName,
				orderFee: foundOrder.orderFixer.fixerFee,
				orderDuration: foundOrder.orderServiceHours,
				totalOrderFee: foundOrder.orderCost
			})
		})
	} else {
		res.redirect('/login')
	}
})
//Get request: LOGIN SUCCESS PAGE=============================================
app.get('/loginSuccess', function(req, res) {
	if (req.isAuthenticated()) {
		navCheck = true
		Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
			res.render('loginSuccess', {
				clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
			})
		})
	} else {
		res.redirect('/login')
	}
})
//Get request: LOGOUT ROUTE=============================================
app.get('/logout', function(req, res) {
	navCheck = false
	req.logout()
	fromBookingPage = false
	res.redirect('/')
})

// Get request: HISTORY PAGE=============================================
app.get('/history', function(req, res) {
	if (req.isAuthenticated()) {
		Order.find({}, function(err, foundRecord) {
			if (err) {
				console.log(err)
			} else {
				var orderList = []
				for (var i = 0; i < foundRecord.length; i++) {
					if (foundRecord[i].orderClient.username === clientDisplayName) {
						orderList.push(foundRecord[i])
					}
				}
				if (orderList.length > 0) {
					res.render('history', {
						clientDisplayName: orderList[0].orderClient.clientFirstName,
						orderList: orderList
					})
				} else {
					Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
						res.render('noOrder', {
							clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
						})
					})
				}
			}
		})
	} else {
		res.redirect('/login')
	}
})

//=============================================POST REQUESTS=============================================

//Post request: CONTACT FORM @ HOME PAGE=============================================
app.post('/contact', function(req, res) {
	//console.log(req.body)
	const contactData = new Contact({
		contactEmail: req.body.contactEmail,
		contactSubject: req.body.contactSubject,
		contactMessage: req.body.contactMessage
	})
	contactData.save(function(err) {
		if (err) {
			console.log(err)
		} else {
			formCheck = true
			res.redirect('/')
		}
	})
})
//Post request: SERVICE SELECTION @ HOME PAGE=============================================
app.post('/service', function(req, res) {
	//console.log(req.body.serviceType)
	serviceType = req.body.serviceType
	Fixer.find({ fixerService: serviceType }, function(err, foundFixers) {
		fixers = foundFixers
		//console.log(fixers)
		res.redirect('/booking')
		if (serviceType === 'personal-driver') {
			serviceType = _.startCase(serviceType)
		} else if (serviceType === 'lawncare') {
			serviceType = 'Lawn Care'
		} else if (serviceType === 'admin') {
			serviceType = 'Administrative'
		} else {
			serviceType = _.capitalize(serviceType)
		}
	})
})
//Post request: BOOKING FORM @ BOOKING PAGE=============================================
app.post('/selectedFixer', function(req, res) {
	//console.log(req.body.selectedFixer)
	const selectedFixerId = req.body.selectedFixer
	Fixer.findById(selectedFixerId, function(err, foundFixer) {
		if (!err) {
			selectedFixerFee = foundFixer.fixerFee
			//console.log('1:'+selectedFixerFee)
			//console.log('2:'+req.body.hours)
			var dateTime = new Date()
			calcFee = selectedFixerFee * req.body.hours
			//console.log('3:'+calcFee)
			const orderData = new Order({
				orderClient: {},
				orderService: serviceType,
				orderFixer: foundFixer,
				orderServiceHours: req.body.hours,
				orderCost: calcFee,
				orderStreetAddress1: req.body.streetAddress1,
				orderStreetAddress2: req.body.streetAddress2,
				orderCity: req.body.city,
				orderState: req.body.state,
				orderCountry: req.body.country,
				orderZip: req.body.zip,
				orderRating: 10, // TODO (Post MVP): - [ ] Handle order ratings
				orderFixerExpectations: req.body.fixerExpec,
				orderClientResponsibilities: req.body.customerResp,
				orderDate: dateTime,
				orderWorkDate: req.body.orderWorkDate,
				bookingCashConfirm: false
				//orderImage: 'skip'
			})
			if (req.isAuthenticated()) {
				Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
					orderData.orderClient = foundClient
					orderData.save(function(err) {
						if (err) {
							console.log(err)
						} else {
							fromBookingPage = true
							thisOrder = orderData._id
							res.redirect('/payment')
						}
					})
				})
			} else {
				orderData.save(function(err) {
					if (err) {
						console.log(err)
					} else {
						fromBookingPage = true
						thisOrder = orderData._id
						res.redirect('/payment')
						//console.log('orderCheck'+ orderData._id)
					}
				})
			}
		}
	})
})

//Post request: REGISTRATION FORM @ REGISTER PAGE=============================================
app.post('/register', function(req, res) {
	Client.register({ username: req.body.username }, req.body.password, function(err, user) {
		if (err) {
			registerErrorCheck = true
			if (err.name === 'UserExistsError') {
				registerError = 'Email already registered!'
				res.redirect('/register')
			} else {
				registerError = 'Registration Failed! Please try again.'
				res.redirect('/register')
			}
		} else {
			passport.authenticate('local')(req, res, function() {
				Client.findOneAndUpdate(
					{ username: req.body.username },
					{
						clientFirstName: req.body.clientFirstName,
						clientLastName: req.body.clientLastName,
						clientStreetAddress1: req.body.clientStreetAddress1,
						clientStreetAddress2: req.body.clientStreetAddress2,
						clientCity: req.body.clientCity,
						clientState: req.body.clientState,
						clientCountry: req.body.clientCountry,
						clientZip: req.body.clientZip,
						clientMobileNo: req.body.clientMobileNo
					},
					function(err) {
						if (err) {
							console.log(err)
						}
					}
				)
				clientDisplayName = req.body.username
				if (fromBookingPage) {
					fromBookingPage = false
					Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
						Order.findOneAndUpdate({ _id: thisOrder }, { orderClient: foundClient }, function() {
							if (err) {
								console.log(err)
							}
						})
					})
					res.redirect('/payment')
				} else {
					res.redirect('/loginSuccess')
				}
			})
		}
	})
})
//Post request: LOGIN FORM @ LOGIN PAGE=============================================
app.post('/login', function(req, res) {
	const clientAuth = new Client({
		username: req.body.username,
		password: req.body.password
	})
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			console.log(err)
		}
		if (!user) {
			loginErrorCheck = true
			if (info.name === 'IncorrectPasswordError') {
				loginError = 'Please enter the correct password.'
				res.redirect('/login')
			} else if (info.name === 'IncorrectUsernameError') {
				loginError = 'Please enter a registered email address.'
				res.redirect('/login')
			} else {
				loginError = 'Please enter valid credentials'
				res.redirect('/login')
			}
		}
		req.login(user, function(err) {
			if (err) {
				console.log(err)
			} else {
				clientDisplayName = req.body.username
				if (fromBookingPage) {
					fromBookingPage = false
					Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
						Order.findOneAndUpdate({ _id: thisOrder }, { orderClient: foundClient }, function() {
							if (err) {
								console.log(err)
							}
						})
					})
					return res.redirect('/payment')
				} else {
					return res.redirect('/loginSuccess')
				}
			}
		})
	})(req, res)
})

//Post request: CONFIRM BOOKING @ PAYMENT PAGE=============================================
app.post('/bookingCashConfirm', function(req, res) {
	Order.findOneAndUpdate({ _id: thisOrder }, { bookingCashConfirm: true }, function(err) {
		if (err) {
			console.log(err)
		} else {
			Client.findOne({ username: clientDisplayName }, function(err, foundClient) {
				if (err) {
					console.log(err)
				} else {
					res.render('confirmation', {
						clientDisplayName: 'Hi ' + foundClient.clientFirstName + '!'
					})
				}
			})
		}
	})
})

//==========================================SERVER CONNECTION============================================

app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at 3000')
})
