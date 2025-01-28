import winston from 'winston';
import path from 'path';
const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logsDir = 'logs';
const defaultConfig = {
  maxsize: 5242880, // 5MB
  maxFiles: 5,
};

const createLogger = () => {
  const transports = [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
  ];

  if (process.env.ENABLE_FILE_LOGGING === 'true') {
    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        ...defaultConfig,
      }),
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        ...defaultConfig,
      })
    );
  }

  const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports,
    exitOnError: false,
  });

  logger.stream = {
    write: (message) => logger.info(message.trim()),
  };

  return logger;
};

export default createLogger();
