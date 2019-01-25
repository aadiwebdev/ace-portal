const express = require('express');
const router =express.Router();
var User = require('../models/user');


router.get('/',(req,res,next)=>{
    res.render('index');
});

// router.post('/student',(req,res,next)=>{
// console.log(req.body.name);
//  console.log(req.body.password);
//  res.redirect('/');
// });

router.post('/faculty',(req,res,next)=>{
 console.log(req.body);
 console.log(req.body.password);
 res.redirect('/');
});

router.post('/parent',(req,res,next)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    res.redirect('/');
});

router.post('/admin',(req,res,next)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    res.redirect('/');
});
//POST route for updating data
router.post('/student', function (req, res, next) {
  // confirm that user typed same password twice

  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
          console.log(req.session);
        req.session.userId = user._id;
         res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;