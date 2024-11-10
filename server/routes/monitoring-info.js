var express = require('express');
var router = express.Router();

/* GET monitoring info page. */
router.get('/', function(req, res, next) {
  res.render('monitoring-info', { title: 'Monitoring Info' });
});