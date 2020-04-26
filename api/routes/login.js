const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', 
  function( req, res, next){
    next();
},
  passport.authenticate('local'),
  (req, res) => {
    var userInfo = {
      name: req.user.name,
      id: req.user.id,
      isLoggedIn: true
    }
    res.send({userInfo})
  }
)


module.exports = router;