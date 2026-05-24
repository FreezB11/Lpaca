import { createClient, RedisClientType } from "redis";

const client: RedisClientType = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
})

async function connectRedis(): Promise<void>{
    await client.connect();
    console.log('Successfully connect to Redis');
}

client.on('error', (err: Error) => {
    console.log('Redis connection error', err);
})

connectRedis().catch(console.error);