var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/doSomething', function(req, res, next) {
  res.send(`answer from [${process.env.runMode}]`);
});

module.exports = router;
