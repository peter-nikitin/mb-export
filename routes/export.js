var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");


const urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET users listing. */
router.post('/export/', urlencodedParser, function(req, res, next) { √
  res.send('respond with a resource');
});

module.exports = router;
