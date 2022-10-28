import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';


export const initWinston = (apiTitle: string) => {
  const transports = {
    console: new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(apiTitle),
      ),
    }),
    combinedFile: new winstonDailyRotateFile({
      dirname: 'logs',
      filename: 'combined',
      extension: '.log',
      level: 'info',
    }),
    errorFile: new winstonDailyRotateFile({
      dirname: 'logs',
      filename: 'error',
      extension: '.log',
      level: 'error',
    }),
  };
  
  return WinstonModule.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: apiTitle },
    transports: [
      transports.console,
      transports.combinedFile,
      transports.errorFile,
    ],
  })
}

