const router = require('express').Router();
const FeedsController = require('../controllers/feeds.controller');
const checkLog = require('./checkLog');

router.get('/', checkLog, FeedsController.feeds);

router.post('/', checkLog, FeedsController.createFeed);

module.exports = router;