const express = require('express')
const bodyParser = require('body-parser')
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
mongoose.connect('mongodb://localhost:27017/assistuDB', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
//Database schemas======================================
const serviceSchema = new mongoose.Schema({
	serviceName: { type: String, required: [true, 'This is a compulsory field'] },
	serviceDescription: { type: String, required: [true, 'This is a compulsory field'] },
	serviceFee: { type: Number, required: [true, 'This is a compulsory field'] },
	serviceImage: String
})
const orderSchema = new mongoose.Schema({
	userID: String,
	serviceID: String,
	servingHours: { type: Number, required: [true, 'This is a compulsory field'] },
	cost: { type: Number, required: [true, 'This is a compulsory field'] },
	comments: String,
	orderDate: Date,
	workDate: { type: Date, required: [true, 'This is a compulsory field'] }
})
const userSchema = new mongoose.Schema({
	userEmail: { type: String, required: [true, 'This is a compulsory field'] },
	password: { type: String, required: [true, 'This is a compulsory field'] },
	name: { type: String, required: [true, 'This is a compulsory field'] },
	address: { type: String, required: [true, 'This is a compulsory field'] },
	mobileNo: { type: Number, required: [true, 'This is a compulsory field'] },
	profileImage: String
})
//============================================================
//basic html boilerplate setup done
//path and folders made
//partials (header/footer) folder done
//connection to database on local done
//initial database schemas defined
//gitignore needed but not yet defined
// code here

app.get('/', function(req, res) {
	res.render('home')
})

app.listen(3000, function() {
	console.log('Server started on port 3000')
})
