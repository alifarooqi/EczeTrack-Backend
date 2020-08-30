const express = require('express');

const getController = require('../../controllers/get.controller');

const router = express.Router();

router.post('/food-list', getController.foodList);

module.exports = router;
