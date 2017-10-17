const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');
const hash = require('hasha');

const url = 'mongodb://local:123123123@ds038319.mlab.com:38319/trips_bon';
const db = 'trips_bon';

router.post('/submit', function(req,res,next){
	// req.check('Password',"Invalid Password").isLength({min:6});
	// req.check('RepeatPassword',"Invalid RepeatPassword").equals(req.body.Password);
	// req.check('FullName','Invalid FullName').isLength({min:4});
	// req.check('PhoneNumber','Invalid PhoneNumber').isLength({min:10});
	// req.check('Email','Invalid Email').isEmail();
	// var errors = req.validationErrors();     
	// if(errors){
	// 	res.json(errors);
	// }else{
		var dataClient = {
				Name  	   : req.body.name,
				Email 	   : req.body.email,
				RegisTime  : new Date().toDateString(),
				Trip       : req.body.Trip,
		}
//
		mongo.connect(url,function(err,db){
			assert.equal(null,err);
					db.collection('tripsClient').insertOne(dataClient,function(err,result){
						if(!err)
							{
								res.json('success!');
								assert.equal(null,err);
								db.close();
							}
						else
						{	
							try{
								}catch(err){
									console.log(err);
							}finally{
								res.json('Error!');
								db.close();
							}
						}
						});
				}
			);
		// };
	// }
});
module.exports = router;