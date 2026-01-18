// eslint-disable-next-line import/no-unresolved
import { Hono } from "@hono/hono";

export const app = new Hono().basePath("/tgNewUser");
