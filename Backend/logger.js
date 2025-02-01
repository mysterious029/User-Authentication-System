// logger.js
const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Function to create a logger
const createLogger = (logFileName = 'combined.log', logLevel = 'info') => {
    const logDir = path.join(__dirname, 'logs');

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    // Define the logger
    const logger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
            winston.format.timestamp(), // Adds timestamp to each log
            winston.format.json() // Log messages in JSON format
        ),
        transports: [
            // Log error messages to a separate file
            new winston.transports.File({
                filename: path.join(logDir, 'error.log'),
                level: 'error',
            }),
            // Log all messages (info and above) to the specified log file
            new winston.transports.File({
                filename: path.join(logDir, logFileName),
                level: logLevel,
            }),
        ],
    });

    // If not in production, log to the console as well
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(), // Simple console format
        }));
    }

    return logger;
};

module.exports = createLogger; // Export the logger function

