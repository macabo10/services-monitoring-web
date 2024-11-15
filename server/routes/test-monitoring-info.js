const express = require('express');
const router = express.Router();

const cors = require('cors');
router.use(cors());

const monitoringInfos = [
  {
    containerID: { id: 'container1' },
    container: { status: true },
    api: { status: true },
    userCapacity: { in: 100, out: 50 },
    cpu: { usage: 20 },
    ram: { usage: 50, used: 512, max: 1024 },
    network: { speed: 100 },
  },
  {
    containerID: { id: 'container2' },
    container: { status: false },
    api: { status: false },
    userCapacity: { in: 0, out: 0 },
    cpu: { usage: 0 },
    ram: { usage: 0, used: 0, max: 1024 },
    network: { speed: 0 },
  },
  // Add more monitoring info objects as needed
];

router.get('/gold-price-service', (req, res) => {
  res.json(monitoringInfos);
});

router.get('/exchange-rate-service', (req, res) => {
  res.json(monitoringInfos);
});

module.exports = router;