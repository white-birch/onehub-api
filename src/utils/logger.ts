import httpContext from 'express-http-context';
import winston from 'winston';

const addTraceId = winston.format((info) => ({ ...info, traceId: httpContext.get('traceId') }));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), addTraceId(), winston.format.json()),
  transports: [new winston.transports.Console()],
});

export default logger;
