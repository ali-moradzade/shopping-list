import * as dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string) {
    const result = process.env[name];
    if (!result) {
        throw new Error(`Environment variable required but not found: ${name}`);
    }

    return result;
}

export const APP_CONFIG = {
    port: getEnv('APP_PORT'),
    secretKey: getEnv('SECRET_KEY'),
    expiresIn: '1d',
};

export const DB_CONFIG = {
    host: getEnv('DB_HOST'),
    port: getEnv('DB_PORT'),
    name: getEnv('DB_NAME'),
};
