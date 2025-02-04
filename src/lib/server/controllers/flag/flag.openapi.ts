import {createRoute, z} from "@hono/zod-openapi"

export const deleteFlag = createRoute({
    method: "delete",
    path: "/:id",
    description: "require cookie token",
    tags: ["projects"],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: {
        200: {
            description: "Deleted Flag"
        },
        404: {
            description: "Not found"
        },
        401: {
            description: "Unauthorized"
        }
    }
})

export const getFlag = createRoute({
    method: "get",
    path: "/:id",
    description: "require cookie token",
    tags: ["flags"],
    request: {
        params: z.object({
            id: z.string()
        })
    },
    responses: {
        200: {
            description: "Retrieve a project data",
            content: {
                "application/json": {
                    schema: z.object({
                        name: z.string(),
                        development: z.boolean(),
                        production: z.boolean(),
                        show_note: z.boolean(),
                        note: z.string().nullable(),
                    })
                }
            }
        },
        401: {
            description: "Unauthorized"
        },
        404: {
            description: "Not found"
        }
    }
})

export const toggleFlag = createRoute({
    method: "put",
    path: "/:id",
    description: "require cookie token",
    tags: ["flags"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        development: z.boolean(),
                        production: z.boolean(),
                        show_note: z.boolean(),
                    })
                }
            },
        },
        params: z.object({
            id: z.string()
        })
    },
    responses: {
        200: {
            description: "Toggled"
        },
        401: {
            description: "Unauthorized"
        },
        404: {
            description: "Not found"
        }
    }
})

export const createFlag = createRoute({
    method: "post",
    path: "/:id",
    description: "require cookie token",
    tags: ["flags"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        name: z.string().min(1).max(32),
                        note: z.string().optional()
                    })
                }
            }
        },
        params: z.object({
            id:z.string()
        })
    },
    responses: {
        200: {
            description: "Create Flag"
        },
        401: {
            description: "Unauthorized"
        }
    }
})