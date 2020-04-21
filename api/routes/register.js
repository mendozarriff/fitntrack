const express = require('express');
const router = express.Router();

router.route('/').post( (req, res) => {

  const {name, email, password, password2} = req.body.newUser;

  console.log(name, email, password, password2)

})

module.exports = router;