var express = require('express');
var router = express.Router();
const coolRouter = require('./cool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/cool', coolRouter)

module.exports = router;
