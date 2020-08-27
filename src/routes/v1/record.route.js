const express = require('express');

const recordController = require('../../controllers/record.controller');

const router = express.Router();

router.post('/', recordController.record);
router.post('/check-weekly', recordController.checkWeekly);
router.post('/check-daily', recordController.checkDaily);

module.exports = router;
