var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const mongo = require('mongodb');
const assert = require('assert');


var url = 'mongodb://local:123123123@ds038319.mlab.com:38319/trips_bon';
var db = 'trips_bon';
/* GET home page. */
router.get('/', function(req, res, next){

  	res.render('index',{title:'WHERE WOULD YOU LIKE TO GO?', success: req.session.success, errors: req.session.errors });
		err = null;
  	res.session.errors = null;
});

var transporter = nodemailer.createTransport('smtps://kubonne0000%40gmail.com:Kubonne123@smtp.gmail.com');

router.post('/submit',function(req,res,next){
	console.log(req.body)
	req.check('origin','Invalid Origin').isLength({min:2}).notEmpty();
	req.check('Destination','Invalid Destination').isLength({min:2}).notEmpty();
	req.check('checkin',"'Check in' no later than today! or Invalid day set!").isAfter().notEmpty();
	req.check('checkout',"'Check out' at least 1 day! or Invalid day set!").isAfter(req.body.checkin).notEmpty();
	req.check('adults','Invalid Adults').isIn(['2+1 WITH BEDROOM + 2 CHILD','1+1 WITH BEDROOM + 1 CHILD','2+1 WITH BEDROOM + FULL','FULL SERVICES 15 DAYS']).notEmpty();
	req.check('budget','Invalid Budget').isIn(['MAX BUDGET','$1000','$2000','$3000','$5000']).notEmpty();
	req.check('email','Invalid Email').notEmpty().isEmail();
	var errors = req.validationErrors();

	if(errors){
		err = [];
		errors.forEach(function(e){
			err.push(e.msg);
		});
		req.session.errors = err;
		req.session.success = false;
	}else{
		var dataClient = {
				Origin	   : req.body.origin,
				Destination: req.body.Destination,
				CheckIn    : req.body.checkin,
				CheckOut   : req.body.checkout,
				Adults     : req.body.adults,
				Budget     : req.body.budget,
				Email 	   : req.body.email
			}
		req.session.success = true;
		// mongo.connect(url,function(err,db){
		// 	assert.equal(null,err);
		// 	db.collection('tripsClient').insertOne(dataClient,function(err,result){
		// 		assert.equal(null,err);
		// 		db.close();
		// 	});
		// });

		function finished(err){
			console.log(err);
		};

		var mailOptions = {
			    from: '"Trips of Bon"<kubonne000@gmail.com>',
			    to: req.body.email,
			    subject: 'Hello Welcom to TripS', 
			    text: 'Chúc Quý Khách có chuyến đi vui vẻ',
			    html: '<b>Hello Welcom to TripS'+'</b><br><h1>'+req.body.Destination+'</h1><h2>Ngày khởi hành '+req.body.checkin+'</h2>'
			};
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});

		var mailOptions2 = {
		    from: 'Hello Welcom to TripS',
		    to: 'vanvietquocanhanh@hotmail.com',
		    subject: 'Có Người ĐK tour', 
		    text: 'Số người đăng ký tour',
		    html: '<h1>'+req.body.Destination+'</h1><h1>'+req.body.checkin+'</h1><h1>'+req.body.checkout+'</h1><h1>'+req.body.adults+'</h1><h1>'+req.body.budget+'</h1><h1>'+req.body.email+'</h1>'
		};
		transporter.sendMail(mailOptions2, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});
		
		}
	res.redirect('/');
});
module.exports = router;

