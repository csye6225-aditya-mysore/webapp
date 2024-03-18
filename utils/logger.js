import winston from "winston";

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    defaultMeta: "wwebapp-service",
    transports: [
        new winston.transports.File({filename: "/var/log/webapplogs/webapp-logs", level: "debug"})
    ]
});

export default logger;