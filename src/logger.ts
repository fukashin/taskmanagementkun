//logger.ts
export const log = (...args: any[]) => {
    console.log('[LOG]:', ...args);
  };
  // logger.ts
enum LogLevel {
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

const logMessage = (level: LogLevel, ...args: any[]) => {
  console.log(`[${level}]:`, ...args);
};

export const fatal = (...args: any[]) => logMessage(LogLevel.FATAL, ...args);
export const error = (...args: any[]) => logMessage(LogLevel.ERROR, ...args);
export const warn = (...args: any[]) => logMessage(LogLevel.WARN, ...args);
export const info = (...args: any[]) => logMessage(LogLevel.INFO, ...args);
export const debug = (...args: any[]) => logMessage(LogLevel.DEBUG, ...args);
