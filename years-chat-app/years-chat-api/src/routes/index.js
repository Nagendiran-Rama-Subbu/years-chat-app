var express = require('express');
var router = express.Router();
var userController = require("../controllers/user");
var myCache = require('../inMemory')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.status(200).json({status: "success"})

});

router.get('/get-keys', function(req, res, next) {
  let mykeys = myCache.get('Members');
  console.log("mykeys => "+ JSON.stringify(mykeys));
  res.status(200).json({status: "success", payload: mykeys})

});
router.get('/flush', function(req, res, next) {
  let mykeys = myCache.flushAll();
  console.log("mykeys => "+ JSON.stringify(mykeys));
  res.status(200).json({status: "success", payload: mykeys})

});

router.post('/login', userController.login);

router.get('/users', userController.fetchMembers);

module.exports = router;
