import * as c from 'ansi-colors';

export function def(done: (error?: Error) => void): void {
    console.log(`
${c.green('==========================================================================')}
${c.green('=============================   GULP TASKS   =============================')}
${c.green('==========================================================================')}
${c.cyan.bold('build')} • ${c.gray.italic('Builds the site and uploads source maps to Sentry.')}
${c.cyan.bold('release')} • ${c.gray.italic('Publishes a new release to Sentry.')}
    `);
    done();
}