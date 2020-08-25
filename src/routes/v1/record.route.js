const express = require('express');

const recordController = require('../../controllers/record.controller');

const router = express.Router();

/** ***************
  Daily
 **************** */

router.post('symptoms', recordController.recordSymptoms);
router.post('msu', recordController.recordMSU);
router.post('das', recordController.recordDAS);
router.post('environment', recordController.recordEnv);

/** ***************
 Weekly
 **************** */

router.post('exercise', recordController.recordExercise);
router.post('stress', recordController.recordStress);
router.post('sleep', recordController.recordSleep);

module.exports = router;
