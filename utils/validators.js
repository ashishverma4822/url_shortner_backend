
function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function isValidFutureDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date > new Date();
}

module.exports = {
  isValidHttpUrl,
  isValidFutureDate,
};
