var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


var url = 'mongodb://local:123123123@ds038319.mlab.com:38319/trips_bon';
var db = 'trips_bon';
/* GET home page. */
router.get('/', function(req, res, next){
  	res.render('index',{title:'WHERE WOULD YOU LIKE TO GO?'});
});

// var transporter = nodemailer.createTransport('smtps://kubonne0000%40gmail.com:Kubonne123@smtp.gmail.com');


// 		req.session.success = true;
// 		// mongo.connect(url,function(err,db){
// 		// 	assert.equal(null,err);
// 		// 	db.collection('tripsClient').insertOne(dataClient,function(err,result){
// 		// 		assert.equal(null,err);
// 		// 		db.close();
// 		// 	});
// 		// });

// 		function finished(err){
// 			console.log(err);
// 		};

// 		var mailOptions = {
// 			    from: '"Trips of Bon"<kubonne000@gmail.com>',
// 			    to: req.body.email,
// 			    subject: 'Hello Welcom to TripS', 
// 			    text: 'Chúc Quý Khách có chuyến đi vui vẻ',
// 			    html: '<b>Hello Welcom to TripS'+'</b><br><h1>'+req.body.Destination+'</h1><h2>Ngày khởi hành '+req.body.checkin+'</h2>'
// 			};
// 		transporter.sendMail(mailOptions, (error, info) => {
// 		    if (error) {
// 		        return console.log(error);
// 		    }
// 		    console.log('Message %s sent: %s', info.messageId, info.response);
// 		});

// 		var mailOptions2 = {
// 		    from: 'Hello Welcom to TripS',
// 		    to: 'vanvietquocanhanh@hotmail.com',
// 		    subject: 'Có Người ĐK tour', 
// 		    text: 'Số người đăng ký tour',
// 		    html: '<h1>'+req.body.Destination+'</h1><h1>'+req.body.checkin+'</h1><h1>'+req.body.checkout+'</h1><h1>'+req.body.adults+'</h1><h1>'+req.body.budget+'</h1><h1>'+req.body.email+'</h1>'
// 		};
// 		transporter.sendMail(mailOptions2, (error, info) => {
// 		    if (error) {
// 		        return console.log(error);
// 		    }
// 		    console.log('Message %s sent: %s', info.messageId, info.response);
// 		});
		
// 		}
// 	res.redirect('/');
// });
module.exports = router;

