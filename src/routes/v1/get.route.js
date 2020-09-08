const express = require('express');

const getController = require('../../controllers/get.controller');

const router = express.Router();

router.post('/food-list', getController.foodList);
router.post('/chart-data', getController.getChartData);
router.post('/day-symptoms', getController.getDaySymptoms);
router.post('/day-das', getController.getDayDAS);

module.exports = router;
