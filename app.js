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
});
const orderSchema = new mongoose.Schema({
	clientID: String,
	serviceID: String,
	servingHours: { type: Number, required: [true, 'This is a compulsory field'] },
	cost: { type: Number, required: [true, 'This is a compulsory field'] },
	comments: String,
	orderDate: Date,
	workDate: { type: Date, required: [true, 'This is a compulsory field'] }
});
const clientSchema = new mongoose.Schema({
	clientEmail: { type: String, required: [true, 'This is a compulsory field'] },
	password: { type: String, required: [true, 'This is a compulsory field'] },
	name: { type: String, required: [true, 'This is a compulsory field'] },
	address: { type: String, required: [true, 'This is a compulsory field'] },
	mobileNo: { type: Number, required: [true, 'This is a compulsory field'] },
	profileImage: String
});
const contactUsSchema = new mongoose.Schema({
	contactEmail: { type:String, required: [true, 'This is a compulsory field']},
	contactSubject: { type:String, required: [true, 'This is a compulsory field']},
	contactMessage: { type:String, required: [true, 'This is a compulsory field']}
});


// app codes-----------------------------------------------------------------------------------
const Contact = mongoose.model("Contact", contactUsSchema);
var formCheck = false;
app.get("/", function(req,res){
	if(formCheck){
		formCheck = false;
		res.render("home",{
			successMessage: "Thanks for your message! We will be in touch with you soon."
		});
	} else{
		res.render("home",{
			successMessage: " "
		});
	}
});
app.post("/contact", function(req, res){
	console.log(req.body);
	const contactData = new Contact ({
		contactEmail: req.body.contactEmail,
		contactSubject: req.body.contactSubject,
		contactMessage: req.body.contactMessage
	});
	contactData.save(function(err){
		if(err){
			console.log(err);
		}else{
			formCheck = true;
			res.redirect("/");
		}
	});
});

app.listen(3000, function() {
	console.log('Server started on port 3000')
})
