const express = require('express');
const router = express.Router();

const cors = require('cors');
router.use(cors());

router.post('/cpu', (req, res) => {
    const containerID = req.body.containerID;
    console.log(`Container ID: ${containerID}`);
    if (containerID === "container1") {
        const data = [
            { name: '1m', usage: (Math.random() * 3 + 1).toFixed(2) },
            { name: '2m', usage: (Math.random() * 3 + 1).toFixed(2) },
            { name: '3m', usage: (Math.random() * 3 + 1).toFixed(2) },
            { name: '4m', usage: (Math.random() * 3 + 1).toFixed(2) },
            { name: '5m', usage: (Math.random() * 3 + 1).toFixed(2) },
        ];
        res.json(data);
    }
});

module.exports = router;