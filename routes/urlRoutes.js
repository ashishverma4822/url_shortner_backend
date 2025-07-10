const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController.js');
const rateLimiter = require('../middleware/rateLimiter.js');

router.post('/shorten', rateLimiter, shortenUrl);
router.get('/:code', rateLimiter, redirectUrl);

module.exports = router;
