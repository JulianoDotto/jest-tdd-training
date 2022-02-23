const buildStringFromKey = ([key, value]) => {
  if (typeof value !== 'string' && value !== null && !Array.isArray(value))
    throw new Error('Value should be a string or string[]');
  if (!!value) return `${key}=${value}`;
};

module.exports.queryString = obj =>
  Object.entries(obj)
    .map(buildStringFromKey)
    .filter(item => !!item)
    .join('&');

module.exports.parseQueryString = queryString =>
  Object.fromEntries(
    queryString.split('&').map(item => {
      const parts = item.split('=');
      if (parts[1].indexOf(',') > -1) {
        parts[1] = parts[1].split(',');
      }
      return parts;
    }),
  );
