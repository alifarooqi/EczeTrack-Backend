const express = require('express');

const getController = require('../../controllers/get.controller');

const router = express.Router();

router.post('/food-list', getController.foodList);
router.post('/symptoms', getController.symptoms);
router.post('/msu', getController.msu);
router.post('/das', getController.das);
router.post('/env', getController.env);
router.post('/exercise', getController.exercise);
router.post('/stress', getController.stress);
router.post('/sleep', getController.sleep);

module.exports = router;
