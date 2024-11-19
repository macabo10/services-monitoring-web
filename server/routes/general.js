var express = require('express');
var router = express.Router();
var actions = require('../services/actions');

const cors = require('cors');
router.use(cors());

router.get('/:service_id', async function (req, res, next) {
    try {
        res.json(await actions.getGeneralInfo(req.params.service_id));
    } catch (error) {
        console.error('Error While Querying:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
