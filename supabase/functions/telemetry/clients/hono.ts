// eslint-disable-next-line import/no-unresolved
import { Hono } from "@hono/hono";
// eslint-disable-next-line import/no-unresolved
import { cors } from "@hono/hono/cors";

export const app = new Hono().basePath("/telemetry").use(cors());
