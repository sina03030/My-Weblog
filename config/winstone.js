const winston = require('winston');
const appRoot = require('app-root-path');

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: `${appRoot}/logs/app.log`,
            handleExceptions: true,
            format: winston.format.json(),
            maxsize: 5000000,
            maxFiles: 5
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.combine(winston.format.colorize(),winston.format.simple())
        })
    ],
    exitOnError: false,
});

logger.stream = {
    write: function(msg) {
        logger.info(msg);
    }
}

module.exports = logger; 