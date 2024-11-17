var express = require('express');
var router = express.Router();
var actions = require('../services/actions');

router.get('/', async function (req, res, next) {
    try {
        res.json(await actions.getExchangeRate());
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});

module.exports = router;