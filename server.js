const app = require('./app')
require('dotenv').config()
const PORT = process.env.PORT
const logger = require('./utils/logger')
const connectDB = require('./models/db')

// CONNECT TO DB
connectDB()

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (error, origin) => {
    logger.error("UNCAUGHT EXCEPTION! 🔥 Shutting Down...");
    logger.error(err.name, err.message);
    process.exit(1);
})


const server = app.listen(PORT, () => {
    logger.info(`server listening on port ${PORT}...`);
})

//UNHANDLED REJECTION
process.on('unhandledRejection', (reason) => {
    logger.error("UNHANDLED REJECTION! 🔥 Shutting Down...");
    logger.error({ 'REASON': reason });
    server.close(() => {
        process.exit(1);
    });
})