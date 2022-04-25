import httpContext from 'express-http-context';
import winston from 'winston';

const level = process.env.LOG_LEVEL || 'info';

if (!Object.keys(winston.config.npm.levels).includes(level)) {
  throw new Error(`Invalid environment variable: LOG_LEVEL. Received value: ${level}. Valid values are: ${Object.keys(winston.config.npm.levels).join(', ')}`);
}

const normalize = winston.format(({ error, ...rest }) => ({
  ...rest,
  traceId: httpContext.get('traceId'),
  userId: httpContext.get('token')?.user?.id,
  ...(error instanceof Error ? { error: { message: error.message, stack: error.stack } } : { error }),
}));

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(winston.format.timestamp(), normalize(), winston.format.json()),
  transports: [new winston.transports.Console()],
});

logger.info({ message: `Log level set to: ${level}` });

export default logger;
