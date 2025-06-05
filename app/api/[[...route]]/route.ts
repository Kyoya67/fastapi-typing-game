import { Redis } from "@upstash/redis";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";

type EnvConfig = {
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono().basePath("/api");

app.get("/ping", (c) => {
    return c.text("pong");
});

app.post("/result", async (c) => {
    try {
        const { score, userName } = await c.req.json();

        if (!score || !userName) {
            return c.json({ error: "Missing score or userName" }, 400);
        }

        const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } =
            env<EnvConfig>(c);

        const redis = new Redis({
            url: UPSTASH_REDIS_REST_URL,
            token: UPSTASH_REDIS_REST_TOKEN,
        });

        const result = {
            score: score,
            member: userName,
        };

        await redis.zadd("typing-score-rank", result);

        return c.json({
            message: "Score submitted successfully",
        });
    } catch (e) {
        return c.json({ error: `Error: ${e}` }, 500);
    }
});

app.get("/result", async (c) => {
    try {
        const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } =
            env<EnvConfig>(c);

        const redis = new Redis({
            token: UPSTASH_REDIS_REST_TOKEN,
            url: UPSTASH_REDIS_REST_URL,
        });

        // redisからスコアとユーザー名を取得（トップ10）
        const topRankings = await redis.zrange("typing-score-rank", 0, 9, {
            rev: true,
            withScores: true,
        });

        const topScores = Array.from({ length: topRankings.length / 2 }, (_, i) => ({
            userName: topRankings[i * 2],
            score: topRankings[i * 2 + 1],
        }));

        const bottomRankings = await redis.zrange("typing-score-rank", 0, 9, {
            withScores: true,
        });

        const bottomScores = Array.from({ length: bottomRankings.length / 2 }, (_, i) => ({
            userName: bottomRankings[i * 2],
            score: bottomRankings[i * 2 + 1],
        }));

        return c.json({
            topResults: topScores,
            bottomResults: bottomScores,
        });
    } catch (e) {
        return c.json({
            message: `Error: ${e}`,
        });
    }
});

export const GET = handle(app);
export const POST = handle(app);
