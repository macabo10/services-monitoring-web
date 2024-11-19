var express = require('express');
var router = express.Router();
var actions = require('../services/actions');
const cors = require('cors');
router.use(cors());

router.get('/cpu/:container_name', async function (req, res, next) {
    try {
        res.json(await actions.getDetailCPU(req.params.container_name));
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});

router.get('/memory/:container_name', async function (req, res, next) {
    try {
        res.json(await actions.getDetailMemory(req.params.container_name));
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});

router.get('/network/:container_name', async function (req, res, next) {
    try {
        res.json(await actions.getDetailNetwork(req.params.container_name));
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});


router.get('/container_status/:container_name', async function (req, res, next) {
    try {
        res.json(await actions.getContainerStatus(req.params.container_name));
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});

router.get('/api_status/:container_name', async function (req, res, next) {
    try {
        res.json(await actions.getAPIStatus(req.params.container_name));
    } catch (error) {
        console.error('Error While Querying...');
        next(error);
    }
});

module.exports = router;