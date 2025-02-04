import simpleAuthRoute from "@server/controllers/simpleAuth/simpleAuth.route"
import projectRoute from "@server/controllers/project/project.route"
import flagRoute from "@server/controllers/flag/flag.route"
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const router = new OpenAPIHono()
    .use(logger())
    .use("*", cors())
    .route("/simpleAuth", simpleAuthRoute)
    .route("/project", projectRoute)
    .route("/flag", flagRoute)
    .get("/doc", swaggerUI({url: "/api/docs"}))



const app = new OpenAPIHono()
    .route("/api", router)
    .doc('/api/docs', { openapi: '3.1.0', info: { title: 'foo', version: '1' } });


export default app;
export type Router = typeof router