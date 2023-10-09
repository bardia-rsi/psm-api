declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly DOMAIN_PROTOCOL: string;
            readonly DOMAIN_NAME: string;
            readonly HOST_PORT: string;
            readonly HOST_URL: string;
            readonly ORIGINS: string;
            readonly MONGO_URL: string;
            readonly REDIS_URL: string;
            readonly REFRESH_TOKEN_SECRET: string;
            readonly REFRESH_TOKEN_EXPIRATION_PERIOD: string;
            readonly ACCESS_TOKEN_SECRET: string;
            readonly ACCESS_TOKEN_EXPIRATION_PERIOD: string;
            readonly LOG_FORMAT: string;
        }
    }
}

export {};