const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const recordRoute = require('./record.route');
const getRoute = require('./get.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/record', recordRoute);
router.use('/get', getRoute);

module.exports = router;
