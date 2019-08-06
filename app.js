const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const _ = require('lodash');
const multer = require('multer')
const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(session({
	secret:process.env.SECRET_KEY,
	resave:false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// for local DB connection ============================================================
mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })
//for live DB connection ============================================================
 //mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
 mongoose.set('useFindAndModify', false)
 mongoose.set('useCreateIndex', true)
//Database schemas======================================
const orderSchema = new mongoose.Schema({
	orderClientID: String,
	orderService: String,
	orderFixerID: String,
	orderServiceHours: Number,
	orderCost: Number,
	orderStreetAddress1:  String,
	orderStreetAddress2:  String,
	orderCity: String,
	orderState:  String,
	orderCountry: String,
	orderZip:  String,
	orderRating:  Number,
	orderFixerExpectations: String,
	orderClientResponsibilities: String,
	orderDate: String,
	orderWorkDate:  Date,
	orderImage: String
})
const clientSchema = new mongoose.Schema({
	username: String,
	password: String,
	clientName: String,
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
	fixerFee: { type: Number, required: [true, 'This is a compulsory field'] },
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
const Order = mongoose.model ('Order', orderSchema)
const Client = mongoose.model ('Client', clientSchema)
passport.use(Client.createStrategy())
passport.serializeUser(function(user, done) {
	done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
	done(null, user);
  });
// passport.serializeUser(Client.serializeUser())
// passport.deserializeUser(Client.deserializeUser())
//variable declarations================================================
var formCheck = false
var fixers = []
var serviceType
var selectedFixer
var selectedFixerFee
let workHours = 1
let calcFee = 1
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
app.get('/login', function(req,res){
	res.render('login')
})
app.get('/register', function(req,res){
	res.render('register')
})
app.get('/payment',function(req,res){
	if (req.isAuthenticated()){
		res.render('payment')
	}else{
		res.redirect('/login')
	}	
})
app.get('/logout', function(req, res){
	req.logout();
	res.redirect("/");
  });

//Post requests=============================================
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
app.post('/service', function(req, res){
	//console.log(req.body.serviceType)
	serviceType = req.body.serviceType
	Fixer.find({fixerService: serviceType}, function(err, foundFixers){
		fixers = foundFixers
		//console.log(fixers)
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
app.post('/selectedFixer', function(req,res){
	//console.log(req.body.selectedFixer)
	const selectedFixerId = req.body.selectedFixer
	Fixer.findById(selectedFixerId, function(err, foundFixer){
		if(!err){
			selectedFixerFee = foundFixer.fixerFee
			//console.log('1:'+selectedFixerFee)
			//console.log('2:'+req.body.hours)
			calcFee = selectedFixerFee*req.body.hours
			//console.log('3:'+calcFee)
			const orderData = new Order ({
				orderClientID: 'EmptyForNow',
				orderService: serviceType,
				orderFixerID: req.body.selectedFixer,
				orderServiceHours: req.body.hours,
				orderCost: calcFee,
				orderStreetAddress1: req.body.streetAddress1,
				orderStreetAddress2: req.body.streetAddress2,
				orderCity: req.body.city,
				orderState: req.body.state,
				orderCountry: req.body.country,
				orderZip: req.body.zip,
				orderRating: 1,
				orderFixerExpectations: req.body.fixerExpec,
				orderClientResponsibilities: req.body.customerResp,		
				orderDate: 'DateNotForNow',
				orderWorkDate:  req.body.orderWorkDate,
				orderImage: 'skip'
			})
			//console.log(orderData)
			orderData.save(function(err) {
				if (err) {
					console.log(err)
				} else {
					res.redirect('/')
				}
			})
		}
	})
})

app.post('/register', function(req,res){

	Client.register({username:req.body.username}, req.body.password, function(err, user){
		if (err){
			console.log(err)
			res.redirect('/register')
		} else{
			passport.authenticate('local')(req, res, function(){
				Client.findOneAndUpdate({username:req.body.username},{
					clientName: req.body.clientName,
					clientStreetAddress1: req.body.clientStreetAddress1,
					clientStreetAddress2: req.body.clientStreetAddress2,
					clientCity: req.body.clientCity,
					clientState: req.body.clientState,
					clientCountry: req.body.clientCountry,
					clientZip: req.body.clientZip,
					clientMobileNo: req.body.clientMobileNo
				},function(err){
					if(err){
						console.log(err)
					}
				})
				res.redirect('/payment')
				console.log('working')
			})
		}
	})
})

app.post('/login', function(req,res){
	const clientAuth = new Client ({
		username:req.body.username,
		password:req.body.password
	})
	req.login(clientAuth, function(err){
		if(err){
			console.log(err)
			console.log('2')
		}else{
			passport.authenticate('local')(req,res,function(error,user,info){
			res.redirect('/payment')
			console.log('working')
			console.log(' ---- '+info)
			})
			console.log('1')
			Client.findOne({username:req.body.username}, function(err, foundUser){
				if(err){console.log(err)}else{
					if (foundUser){} else{res.send('No user exists!')}
				}
			})
		}
		console.log('3')
	})
	console.log('4')
})

// app.post('/login',
//   // wrap passport.authenticate call in a middleware function
//   function (req, res, next) {
//     // call passport authentication passing the "local" strategy name and a callback function
//     passport.authenticate('local', function (error, user, info) {
//       // this will execute in any case, even if a passport strategy will find an error
//       // log everything to console
//       console.log('A: '+error);
//       console.log('B: '+user);
//       console.log('C: '+info);

//       if (error) {
// 		res.status(401).send(error);
// 		console.log('1')
//       } else if (!user) {
// 		res.status(401).send(info);
// 		console.log('2')
//       } else {
// 		next();
// 		console.log('3')
//       }

//       res.status(200).send(info);
//     })(req, res);
//   },

//   // function to call once successfully authenticated
//   function (req, res) {
// 	res.status(200).send('logged in!');
// 	console.log('4')
//   });

//Server connection =============================================
app.listen(process.env.PORT || 3000, function() {
	console.log('Server started at 3000')
})
