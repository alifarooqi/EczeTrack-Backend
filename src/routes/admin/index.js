const express = require('express');
const adminController = require('../../controllers/admin.controller');


const router = express.Router();

router.get('/',function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

router.post('/login', adminController.login);
router.post('/download-data', adminController.getData);


module.exports = router;
