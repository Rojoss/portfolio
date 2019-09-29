import gulp = require('gulp');
import * as c from 'ansi-colors';
import { Constants } from '../src/core/Constants';
import { exec } from 'child_process';

const prompt = require('gulp-prompt');
require('dotenv/config');

export function release(cb: (err?: Error) => void): Promise<void> {
    console.log('');
    return gulp.src('.').pipe(prompt.prompt({
        type: 'input',
        name: 'version',
        message: 'What version do you want to publish?',
        default: Constants.VERSION
    }, (res: { version: string }) => {
        console.log(`Releasing version ${c.green.bold(res.version)} to Sentry...`);

        const env = {
            SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
            SENTRY_ORG: process.env.SENTRY_ORG
        };
        exec(`sentry-cli releases new -p ${process.env.SENTRY_PROJECT} ${res.version}`, { env }, (err, stdout, stderr) => {
            stdout && console.log('[SENTRY]', stdout);
            stderr && console.error('[SENTRY]', stderr);
            if (err) {
                cb(err);
                return;
            }

            exec(`sentry-cli releases set-commits --auto ${res.version}`, { env }, (_err, _stdout, _stderr) => {
                _stdout && console.log('[SENTRY]', _stdout);
                _stderr && console.error('[SENTRY]', _stderr);
                if (_err) {
                    cb(_err);
                    return;
                }

                console.log(c.green('Published a new release to Sentry!'));
                cb();
            });
            cb();
        });
    }));
}