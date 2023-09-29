import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("Connection has been established successfully to the Redis."));

redis.on("error", (e: any) => console.log("Failed to connect to the Redis redisClient", e));

export default redis;