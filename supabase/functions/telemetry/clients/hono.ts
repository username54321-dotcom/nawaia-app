import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

export const app = new Hono().basePath("/telemetry").use(cors());
