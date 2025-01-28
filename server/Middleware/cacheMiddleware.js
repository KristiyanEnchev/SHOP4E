import NodeCache from 'node-cache';
import logger from '../Config/logger.js';

const cache = new NodeCache({
  stdTTL: 300, // 5 minutes default TTL
  checkperiod: 60,
  useClones: false,
});

export const noCache = (req, res, next) => {
  req.noCache = true;
  next();
};

export const cacheMiddleware = (options = {}) => {
  const {
    ttl = 300,
    key = (req) => `__express__${req.originalUrl}`,
    condition = () => true,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  return async (req, res, next) => {
    if (req.method !== 'GET' || !condition(req) || req.noCache) {
      return next();
    }

    const cacheKey = typeof key === 'function' ? key(req) : key;

    try {
      const cachedResponse = cache.get(cacheKey);

      if (cachedResponse) {
        logger.debug('Cache hit:', {
          key: cacheKey,
          method: req.method,
          url: req.originalUrl,
        });

        return res.json(deserialize(cachedResponse));
      }

      const originalJson = res.json;

      res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            cache.set(cacheKey, serialize(body), ttl);
            logger.debug('Cache set:', {
              key: cacheKey,
              ttl,
              method: req.method,
              url: req.originalUrl,
            });
          } catch (error) {
            logger.error('Cache set error:', {
              error,
              key: cacheKey,
              method: req.method,
              url: req.originalUrl,
            });
          }
        }

        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', {
        error,
        key: cacheKey,
        method: req.method,
        url: req.originalUrl,
      });
      next();
    }
  };
};

export const clearCache = (pattern) => {
  if (pattern) {
    const keys = cache.keys();
    const matchingKeys = keys.filter((key) =>
      typeof pattern === 'string' ? key.includes(pattern) : pattern.test(key)
    );

    matchingKeys.forEach((key) => cache.del(key));

    logger.debug('Cache cleared with pattern:', {
      pattern,
      clearedKeys: matchingKeys.length,
    });
  } else {
    cache.flushAll();
    logger.debug('Cache completely cleared');
  }
};

export const getCacheStats = () => {
  const stats = cache.getStats();
  const keys = cache.keys();

  return {
    hits: stats.hits,
    misses: stats.misses,
    keys: keys.length,
    ksize: stats.ksize,
    vsize: stats.vsize,
  };
};
