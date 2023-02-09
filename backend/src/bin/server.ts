import { Logger } from '@common/logger';
import { getConfig } from '@config/index';
import { IConfig } from '@config/interface';
import { app } from '@src/app';
import { Database } from '@src/loader';

const {
  app: { port },
}: IConfig = getConfig();

const logger = Logger.getLogger({ moduleName: 'server' });

Database.init();

//* Execute application
const server = app.listen(port, () => {
  logger.info(`Server listening on port: ${port}`);
});

//* Shutdown application //
const gracefulShutdownHandler = () => {
  server.close(() => {
    logger.info('👋 All requests stopped, shutting down');

    // disconnect database
    Database.destroy();

    // closed application
    process.exit();
  });
};

// The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
process.on('SIGINT', gracefulShutdownHandler);

// The SIGTERM signal is sent to a process to request its termination.
process.on('SIGTERM', gracefulShutdownHandler);
