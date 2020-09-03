const router = require('express').Router();
const FeedController = require('../controllers/feed.controller');
const checkLog = require('./checkLog');

router.get('/:feedName', checkLog, FeedController.feed);

module.exports = router;