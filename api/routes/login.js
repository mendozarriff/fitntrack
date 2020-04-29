const express = require('express');
const router = express.Router();
const passport = require('passport');
let errors = []

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
   
    if (!user) { return res.send({err, user, info}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({user});
    });
  })(req, res, next);
});


module.exports = router;