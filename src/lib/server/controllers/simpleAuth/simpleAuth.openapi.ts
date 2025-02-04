import {createRoute, z} from "@hono/zod-openapi"

export const registerSimpleAuth = createRoute({
    method: "post",
    path: "/register",
    description: "require username and password",
    tags: ["simpleAuth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        username: z.string(),
                        password: z.string()
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: "Create Account with simpleAuth"
        },
        400: {
            description: "uncomplete information"
        }
    }
})

export const loginSimpleAuth = createRoute({
    method: "post",
    path: "/login",
    description: "require username and password",
    tags: ["simpleAuth"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        username: z.string(),
                        password: z.string()
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: "Login successful with simpleAuth"
        },
        400: {
            description: "uncomplete information"
        },
        401: {
            description: "Unauthorized"
        }
    }
})