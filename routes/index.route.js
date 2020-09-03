const router = require('express').Router();
const IndexController = require('../controllers/index.controller');
const checkLog = require('./checkLog');

router.get('/', checkLog, IndexController.index);

module.exports = router;