import 'dotenv/config';

if (!process.env['GITHUB_CLIENT_ID']) throw new Error('GITHUB_CLIENT_ID is not set');
if (!process.env['GITHUB_CLIENT_SECRET']) throw new Error('GITHUB_CLIENT_SECRET is not set');

export const env = {
    port: process.env['PORT'],
    databaseUrl: process.env['DATABASE_URL'],
    tokenSecret: process.env['TOKEN_SECRET'],

    // GitHub oauth
    sessionSecret: process.env['SESSION_SECRET'],
    githubClientId: process.env['GITHUB_CLIENT_ID'],
    githubClientSecret: process.env['GITHUB_CLIENT_SECRET'],
};
