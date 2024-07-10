import winston, { format } from 'winston';

export const LOG_DIR = process.env.LOG_DIR || 'logs';

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: `${LOG_DIR}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({ filename: `${LOG_DIR}/combined.log` }),
  ],
});

// Log to console as well
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

export default logger;
