declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly DOMAIN_PROTOCOL: string;
            readonly DOMAIN_NAME: string;
            readonly HOST_PORT: string;
            readonly HOST_URL: string;
            MONGO_URL: string;
            readonly REDIS_URL: string;
            REFRESH_TOKEN_SECRET: string;
            REFRESH_TOKEN_EXPIRATION_PERIOD: string;
            ACCESS_TOKEN_SECRET: string;
            ACCESS_TOKEN_EXPIRATION_PERIOD: string;
        }
    }
}

export {};