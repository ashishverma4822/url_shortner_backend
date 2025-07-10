const rateLimitWindowMs = 15 * 60 * 1000; 
const maxRequestsPerWindow = 100;

const ipRequests = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  const now = Date.now();
  const windowStart = now - rateLimitWindowMs;

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }

  const recentRequests = ipRequests.get(ip).filter(timestamp => timestamp > windowStart);

  if (recentRequests.length >= maxRequestsPerWindow) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }

  recentRequests.push(now);
  ipRequests.set(ip, recentRequests);

  next();
};

module.exports = rateLimiter;
