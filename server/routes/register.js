var express = require('express');
var router = express.Router();
const { registerAndUpdateSidecarContainer } = require('../services/store');

const cors = require('cors');
router.use(cors());

router.post('/', async function (req, res, next) {
    const container_info = req.body;
    try {
        await registerAndUpdateSidecarContainer(container_info);
    } catch (error) {
        console.error('Error registering container:', error);
        next(error);
    }
});

module.exports = router;
