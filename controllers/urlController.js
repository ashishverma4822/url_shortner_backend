const Url = require('../models/Url');
const { isValidHttpUrl, isValidFutureDate } = require('../utils/validators.js');
const AppError = require('../utils/AppError');
const shortid = require('shortid');

const BASE_URL = 'http://localhost:5000';

exports.shortenUrl = async (req, res, next) => {
  const { url, expiry } = req.body;

  if (!isValidHttpUrl(url)) {
    throw new AppError('Invalid URL format', 400);
  }

  const existing = await Url.findOne({ originalUrl: url });
  if (existing) {
    return res.json({ shortUrl: `${BASE_URL}/${existing.code}` });
  }

  let expiryDate;

  if (expiry) {
    const parsedExpiry = new Date(expiry);
    if (isNaN(parsedExpiry.getTime())) {
      throw new AppError('Invalid expiry date format', 400);
    }
    expiryDate = parsedExpiry;
  } else {
    expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }

  const code = shortid.generate();
  const newUrl = new Url({
    originalUrl: url,
    code,
    createdAt: new Date(),
    expiry: expiryDate,
  });

  await newUrl.save();

  res.status(201).json({
    shortUrl: `${BASE_URL}/${code}`,
    expiresAt: expiryDate.toISOString(),
  });
};


exports.redirectUrl = async (req, res) => {
  try {
    const record = await Url.findOne({ code: req.params.code });

    if (!record) return res.status(404).json({ error: 'Not found' });

    if (record.expiry && record.expiry < new Date()) {
      return res.status(410).json({ error: 'Link expired' });
    }

    record.clicks += 1;
    await record.save();

    return res.redirect(record.originalUrl);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
