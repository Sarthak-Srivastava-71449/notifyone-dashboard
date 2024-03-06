import { createLogger, format, transports } from 'winston';

const { colorize, errors } = format;

const getFormatedDate = () => {
  function padStr(i) {
    return i < 10 ? `0${i}` : `${i}`;
  }
  const temp = new Date();
  const dateStr =
    padStr(temp.getFullYear()) +
    padStr(1 + temp.getMonth()) +
    padStr(temp.getDate()) +
    padStr(temp.getHours()) +
    padStr(temp.getMinutes()) +
    padStr(temp.getSeconds());
  return dateStr;
};

const logConfiguration = {
  transports: [
    new transports.Console({
      level: 'warn',
    }),
    new transports.File({
      level: 'info',
      filename: 'logs/info.log',
      maxsize: 1024 * 1024 * 20, // 15 MB
      rotationFormat: () => getFormatedDate(),
      format: format.combine(
        errors({ stack: true }),
        colorize(),
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log',
      maxsize: 1024 * 1024 * 20, // 15 MB
      rotationFormat: () => getFormatedDate(),
      format: format.combine(
        errors({ stack: true }),
        colorize(),
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (error) => `${error.level}: ${[error.timestamp]}: ${error.message}`
        )
      ),
    }),
    new transports.File({
      level: 'debug',
      filename: 'logs/debug.log',
      maxsize: 1024 * 1024 * 20, // 15 MB
      rotationFormat: () => getFormatedDate(),
      format: format.combine(
        errors({ stack: true }),
        colorize(),
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (debug) => `${debug.level}: ${[debug.timestamp]}: ${debug.message}`
        )
      ),
    }),
  ],
};
// eslint-disable-next-line import/prefer-default-export
const logger = () => createLogger(logConfiguration);
export default logger();
