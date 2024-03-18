import winston from "winston";

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    defaultMeta: "wwebapp-service",
    transports: []
});

const fileTransport = new winston.transports.File({filename: "/var/log/webapplogs/webapp-logs", level: "debug"});
const consoleTransport = new winston.transports.Console();

logger.add(fileTransport);

export {logger, fileTransport, consoleTransport};