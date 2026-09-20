import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const PUBLIC_JOBS_CACHE_KEY = "cache:jobs:public";
const PUBLIC_JOBS_CACHE_TTL_SECONDS = 60;

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error(`Redis cache read failed for ${key}:`, error);
    return null;
  }
}

export async function setCached<T>(key: string, value: T): Promise<void> {
  try {
    await redis.set(key, value, { ex: PUBLIC_JOBS_CACHE_TTL_SECONDS });
  } catch (error) {
    console.error(`Redis cache write failed for ${key}:`, error);
  }
}

export async function invalidateCached(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`Redis cache invalidation failed for ${key}:`, error);
  }
}
