const dotenv = require('dotenv')
dotenv.config()
// const mongouri=process.env.MONGO_ID;
// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash');
const ejs = require('ejs')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()
app.set('view engine', 'ejs')
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(express.static('public'))
//for local DB connection ============================================================
//mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })
//for live DB connection ============================================================
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
//Database schemas======================================
const orderSchema = new mongoose.Schema({
	orderClientID: String,
	orderService: String,
	orderFixerID: String,
	orderServiceHours: { type: Number, required: [true, 'This is a compulsory field'] },
	orderCost: { type: Number, required: [true, 'This is a compulsory field'] },
	orderStreetAddress1: { type: String, required: [true, 'This is a compulsory field'] },
	orderStreetAddress2: { type: String, required: [true, 'This is a compulsory field'] },
	orderCity: { type: String, required: [true, 'This is a compulsory field'] },
	orderState: { type: String, required: [true, 'This is a compulsory field'] },
	orderCountry: { type: String, required: [true, 'This is a compulsory field'] },
	orderZip: { type: String, required: [true, 'This is a compulsory field'] },
	orderRating: { type: Number, required: [true, 'This is a compulsory field'] },
	orderFixerExpectations: String,
	orderClientResponsibilities: String,
	orderDate: Date,
	orderWorkDate: { type: Date, required: [true, 'This is a compulsory field'] }
})
const clientSchema = new mongoose.Schema({
	clientEmail: { type: String, required: [true, 'This is a compulsory field'] },
	clientPassword: { type: String, required: [true, 'This is a compulsory field'] },
	clientName: { type: String, required: [true, 'This is a compulsory field'] },
	clientStreetAddress1: { type: String, required: [true, 'This is a compulsory field'] },
	clientStreetAddress2: { type: String, required: [true, 'This is a compulsory field'] },
	clientCity: { type: String, required: [true, 'This is a compulsory field'] },
	clientState: { type: String, required: [true, 'This is a compulsory field'] },
	clientCountry: { type: String, required: [true, 'This is a compulsory field'] },
	clientZip: { type: String, required: [true, 'This is a compulsory field'] },
	clientMobileNo: { type: Number, required: [true, 'This is a compulsory field'] },
	clientProfileImage: String
})
const contactUsSchema = new mongoose.Schema({
	contactEmail: { type: String, required: [true, 'This is a compulsory field'] },
	contactSubject: { type: String, required: [true, 'This is a compulsory field'] },
	contactMessage: { type: String, required: [true, 'This is a compulsory field'] }
})
const fixerSchema = new mongoose.Schema({
	fixerName: { type: String, required: [true, 'This is a compulsory field'] },
	fixerCompanyName: { type: String, required: [true, 'This is a compulsory field'] },
	fixerEmail: { type: String, required: [true, 'This is a compulsory field'] },
	fixerMobileNo: { type: Number, required: [true, 'This is a compulsory field'] },
	fixerDescription: { type: String, required: [true, 'This is a compulsory field'] },
	fixerFee: { type: String, required: [true, 'This is a compulsory field'] },
	fixerRating: { type: Number, required: [true, 'This is a compulsory field'] },
	//fixerImage: String,
	fixerService: String,
	fixerStreetAddress1: { type: String, required: [true, 'This is a compulsory field'] },
	fixerStreetAddress2: { type: String, required: [true, 'This is a compulsory field'] },
	fixerCity: { type: String, required: [true, 'This is a compulsory field'] },
	fixerState: { type: String, required: [true, 'This is a compulsory field'] },
	fixerCountry: { type: String, required: [true, 'This is a compulsory field'] },
	fixerZip: { type: String, required: [true, 'This is a compulsory field'] },
})

// app codes-----------------------------------------------------------------------------------
// Models==================================================
const Contact = mongoose.model('Contact', contactUsSchema)
const Fixer = mongoose.model('Fixer', fixerSchema)
//variable declarations================================================
var formCheck = false
var fixers= []
var serviceType
//Get requests=============================================
app.get('/', function(req, res) {
	if (formCheck) {
		formCheck = false
		res.render('thanks')
	} else {
		res.render('home')
	}
})
app.get('/booking', function(req,res){
	res.render('booking', {
		fixerData:fixers,
		serviceType:serviceType
	})
})
//Post requests=============================================
app.post('/contact', function(req, res) {
	console.log(req.body)
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
app.post('/service', function(req, res){
	console.log(req.body.serviceType)
	serviceType = req.body.serviceType
	Fixer.find({fixerService: serviceType}, function(err, foundFixers){
		fixers = foundFixers
		console.log(fixers)
		res.redirect('/booking')
		if (serviceType === 'personal-driver'){
		serviceType= _.startCase(serviceType);
		}else if(serviceType === 'lawncare'){
		serviceType = 'Lawn Care'
		}else{
		serviceType= _.capitalize(serviceType);
		}
		
	})
})
//Server connection =============================================
app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at 3000')
})
