export const DIR = process.cwd();
(global as any).__rootdir__ = DIR;
require('dotenv/config');

import { LogService, setLogService, ReleaseStage } from './core/logger/Logger';
const logService = new LogService();
setLogService(DIR, logService, ReleaseStage[process.env.SENTRY_LOGGER_STAGE as keyof typeof ReleaseStage]);

console.info(`Portfolio from Jos Roossien`);


logService.captureMessage('Hello');