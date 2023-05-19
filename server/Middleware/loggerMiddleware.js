import morgan from 'morgan';
import logger from '../Config/logger.js';

morgan.token('response-time', (req, res) => {
  if (!req._startAt || !res._startAt) {
    return '';
  }

  const ms =
    (res._startAt[0] - req._startAt[0]) * 1e3 +
    (res._startAt[1] - req._startAt[1]) * 1e-6;

  return ms.toFixed(3);
});

morgan.token('user-id', (req) => {
  return req.user ? req.user._id : 'anonymous';
});

morgan.token('body', (req) => {
  if (!req.body) return '{}';

  const body = { ...req.body };

  if (body.password) body.password = '[FILTERED]';
  if (body.creditCard) body.creditCard = '[FILTERED]';

  return JSON.stringify(body);
});

const morganFormat =
  ':remote-addr - :user-id [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms ":referrer" ":user-agent"';

const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

const morganMiddleware = morgan(morganFormat, { stream });

export const requestLogger = (req, res, next) => {
  req._startAt = process.hrtime();

  logger.info('Request started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userId: req.user?._id,
  });

  if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '[FILTERED]';
    if (sanitizedBody.creditCard) sanitizedBody.creditCard = '[FILTERED]';

    logger.debug('Request body:', sanitizedBody);
  }

  const originalEnd = res.end;
  res._startAt = process.hrtime();

  res.end = function (chunk, encoding) {
    res._startAt = process.hrtime();

    originalEnd.call(this, chunk, encoding);

    logger.info('Request completed', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${(
        process.hrtime(req._startAt)[0] * 1e3 +
        process.hrtime(req._startAt)[1] * 1e-6
      ).toFixed(3)}ms`,
    });
  };

  next();
};

export { morganMiddleware };
