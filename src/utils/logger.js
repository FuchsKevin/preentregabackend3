import winston from 'winston';

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'gray',
  },
};

winston.addColors(customLevels.colors);

const buildLogger = (env) => {
  if (env === 'production') {
    return winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error',
          format: winston.format.simple(),
        }),
      ],
    });
  } else {
    return winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }
};

const logger = buildLogger(process.env.NODE_ENV || 'development');

export default logger;
