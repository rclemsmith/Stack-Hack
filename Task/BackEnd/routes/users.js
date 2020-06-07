var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var authenticate = require("../authenticate");
// var cors = require("./cors");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, (err, user) => {
    if (err) {
      res.status = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      passport.authenticate("local")(req, res, () => {
        const token = authenticate.getToken({ _id: req.user._id });
        res.cookie('token', token, { httpOnly: true });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration Successful!' ,token: token,userId: req.user._id,name : req.user.name});
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.cookie('token', token, { httpOnly: true });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: 'Login Successful!', token: token, userId: req.user._id ,name : req.user.name});
});

module.exports = router;
