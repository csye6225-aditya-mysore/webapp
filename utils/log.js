import winston from "winston";
// import dotenv from "dotenv";

// dotenv.config();

const customFormatter = winston.format((info) => {
    info.severity = info.level;
    return info;
});

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormatter(),
        winston.format.json()
      ),
    transports: []
});

const consoleTransport = new winston.transports.Console({
    name: "console",
    colorize: true
});

logger.add(consoleTransport);
// console.log(process.env.NODE_ENV)

// if(process.env.NODE_ENV !== "test"){
//     logger.add(new winston.transports.File({
//         name: "file",
//         filename: "/var/log/webapplogs/webapp-logs",
//         colorize: true,
//         showLevel: true
//     }));
// }

// logger.add(fileTransport);

export default logger;