 const express = require('express');
 const router = express.Router();

 let logout = false;

 router.get('/', (req, res) => {
  req.logout();
  res.send({authorized:false})
 })

 module.exports = router;