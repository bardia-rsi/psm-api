declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGO_URL: string;
            REFRESH_TOKEN_SECRET: string;
            REFRESH_TOKEN_EXPIRATION_PERIOD: string;
            ACCESS_TOKEN_SECRET: string;
            ACCESS_TOKEN_EXPIRATION_PERIOD: string;
        }
    }
}

export {};