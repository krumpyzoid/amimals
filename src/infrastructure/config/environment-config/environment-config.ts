export default () => ({
    NODE_ENV: process.env.NODE_ENV || 'local',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: process.env.DATABASE_PORT || 5432,
    DATABASE_USER: process.env.DATABASE_USER || 'postgres',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'docker',
    DATABASE_NAME: process.env.DATABASE_NAME || 'postgres',
    DATABASE_SCHEMA: process.env.DATABASE_SCHEMA || 'public',
    DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE || false,
    JWT_SECRET: process.env.JWT_SECRET || '74YLbq4%c!wU',
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || 1800,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || '7jML9q4-c!s0',
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 86400,
});
