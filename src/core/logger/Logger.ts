import { Constants } from '../Constants';
import { C } from './C';
import * as Sentry from '@sentry/browser';
import { RewriteFrames } from '@sentry/integrations';

export enum ReleaseStage {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    LOCAL = 'local',
}

export class Logger {
    public static readonly prefix: string = `${C.BLUE}[LOGGER]${C.R}`;
}

export class LogService {

    public init(dir: string, releaseStage: ReleaseStage, version: string): void {
        logger.log(`${Logger.prefix} Initializing log server! (releaseStage: ${releaseStage}, version: ${version})`);
        Sentry.init({
            dsn: process.env.SENTRY_LOGGER_API,
            environment: releaseStage,
            release: version,
            integrations: [new RewriteFrames({
                root: dir
            })]
        });
    }


    public setGlobalScopeData(severity: LogSeverity | undefined, data: IExtraContext | undefined, tags: ITagsContext | undefined, user: IUserContext | undefined): Promise<void> {
        return new Promise((resolve) => {
            Sentry.configureScope((scope) => {
                this.setScopeData(scope, severity, data, tags, user);
                resolve();
            });
        });
    }

    public captureWithScope(severity: LogSeverity | undefined, data: IExtraContext | undefined, tags: ITagsContext | undefined, user: IUserContext | undefined): Promise<void> {
        return new Promise((resolve) => {
            Sentry.withScope((scope) => {
                this.setScopeData(scope, severity, data, tags, user);
                resolve();
            });
        });
    }
    public captureMessage(message: string, severity: LogSeverity = LogSeverity.LOG, log: boolean = true): void {
        Sentry.captureMessage(message, severity as any);
        log && Log(severity, message);
    }

    public captureException(err: Error, log: boolean = true): void {
        Sentry.captureException(err);
        log && Log(LogSeverity.ERROR, err);
    }

    public captureBreadcrumb(message: string, severity: LogSeverity = LogSeverity.INFO, data?: IExtraContext, log: boolean = false): void {
        Sentry.addBreadcrumb({
            message,
            data: data ? this.formatDataToStrings(data) : undefined,
            level: severity as any
        });
        log && Log(LogSeverity.LOG, message);
    }

    public cacheUserData(user: IUserContext): void {
        // Not used on server
    }

    public removeCachedUserData(): void {
        // Not used on server
    }

    protected setScopeData(scope: any, severity: LogSeverity | undefined, data: IExtraContext | undefined, tags: ITagsContext | undefined, user: IUserContext | undefined): void {
        if (severity) {
            scope.setLevel(severity as any);
        }
        if (data) {
            scope.setExtras(data);
        }
        if (tags) {
            scope.setTags(tags);
        }
        if (user) {
            scope.setUser(user);
        }
    }

    protected formatDataToStrings(data: IExtraContext): IExtraContext {
        const newData: IExtraContext = {};
        for (const key in data) {
            if (key === null || key === undefined || !data.hasOwnProperty(key)) {
                continue;
            }
            let value = data[key];
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            newData[key.toString()] = value;
        }
        return newData;
    }
}

export enum LogSeverity {
    FATAL = 'fatal',
    ERROR = 'error',
    WARNING = 'warning',
    LOG = 'log',
    INFO = 'info',
    DEBUG = 'debug',
    CRITICAL = 'critical'
}

export interface IUserContext {
    [key: string]: any;
    id?: string;
    ip_address?: string;
    email?: string;
    username?: string;
}

export interface ITagsContext {
    [tag: string]: string;
}

export interface IExtraContext {
    [key: string]: any;
}

export let logService: LogService;
export function setLogService(dir: string, service: LogService, releaseStage: ReleaseStage = ReleaseStage.LOCAL): void {
    service.init(dir, releaseStage, Constants.VERSION);
    logService = service;
}

const selectedLogger: Console = console;
export const logger = selectedLogger;

export function Log(severity: LogSeverity | undefined, ...data: any): void {
    switch (severity) {
        case LogSeverity.CRITICAL:
        case LogSeverity.FATAL:
        case LogSeverity.ERROR:
            logger.error(...data);
            break;
        case LogSeverity.WARNING:
            logger.warn(...data);
            break;
        case LogSeverity.INFO:
            logger.info(...data);
            break;
        case LogSeverity.DEBUG:
            logger.debug(...data);
            break;
        case LogSeverity.LOG:
        default:
            logger.log(...data);
    }
}