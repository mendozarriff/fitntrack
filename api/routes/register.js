const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/user.model');

router.route('/').post( (req, res) => {

  const {name, email, password, password2} = req.body.newUser;

  let errors = []

  if(!name || !email || !password || !password2){
    errors.push({msg: 'Please fill in all fields'})
  }else{
    // if(password !== password2){
    //   errors.push({msg:'Passwords do not match'})
    // }
    if(password.length < 7){
      errors.push({msg:'Password should be at least 7 characters'})
    }else if(password !== password2){
      errors.push({msg:'Passwords do not match'})
    }
  }

  if(errors.length > 0){
      res.send({
        errors,
      })
  }else{
    User.findOne({email})
    .then( user=> {
      if(user){
        errors.push({msg: "Email is already registered"});
        res.send({
          errors
        })
      }else{
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt)=>
          bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            //set password to hashed
            newUser.password = hash
            //Save user
            newUser.save()
            .then( user=> {
              res.send(errors);
              // res.redirect('/dashboard')
            })
          })
        )
      }
    })
    
  }


})

module.exports = router;