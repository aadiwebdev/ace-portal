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
router.post('/student',(req, res, next)=>
{
    console.log(req.body.email +" "+req.body.password);
    if (req.body.email && req.body.password)
     {
        User.authenticate(req.body.email, req.body.password).then((user)=>{
         
              req.session.userId = user._id;
              res.redirect('/profile');
          
     })
     .catch((err)=>{
         console.log(err);
     });
  } 
});

// GET route after registering
router.get('/profile',(req, res, next)=>{
      User.findById(req.session.userId)
          .exec((error, user)=>
               {
                        //const userInfo ={name:user.name,email:user.email,password:user.password};
                        //return res.render('index',{userInfo:userInfo});
                      res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                    });
                });
// GET for logout logout

router.get('/logout', function (req, res, next) {
     if (req.session)
      {
         // delete session object
         req.session.destroy().then(()=>{
            res.redirect('/');
         }).catch((err)=>{console.log(err)});
       }
         });
 

module.exports = router;