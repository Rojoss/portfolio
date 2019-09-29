import * as c from 'ansi-colors';
import { Constants } from '../src/core/Constants';
import { exec } from 'child_process';

require('dotenv/config');

export function build(cb: (err?: Error) => void): any {
    console.log(`Building version ${c.green.bold(Constants.VERSION)}...`);

    const env = {
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
        SENTRY_ORG: process.env.SENTRY_ORG,
        SENTRY_PROJECT: process.env.SENTRY_PROJECT,
        PORTFOLIO_VERSION: Constants.VERSION
    };
    console.log(env);

    const p = exec(`npm run build`, { env }, (err) => {
        if (err) {
            cb(err);
            return;
        }

        console.log(c.green('Build completed!'));
        cb();
    });
    if (p.stdout) {
        p.stdout.pipe(process.stdout);
    }
    if (p.stderr) {
        p.stderr.pipe(process.stderr);
    }
}