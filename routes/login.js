var express = require('express');
var router = express.Router();


router.get('/login:fullname', function(req, res, next) {
  res.render('admin');
});

module.exports = router;
