const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send("Users initial home page!");
});

router.get('/cool', function (req, res, next) {
  res.send('cool route');
});
module.exports = router;