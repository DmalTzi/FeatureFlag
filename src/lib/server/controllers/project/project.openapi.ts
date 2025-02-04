import {createRoute, z} from "@hono/zod-openapi"

export const deleteProject = createRoute({
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
            description: "Deleted Project"
        },
        404: {
            description: "Not found"
        },
        401: {
            description: "Unauthorized"
        }
    }
})

export const getAllProject = createRoute({
    method: "get",
    path: "/all",
    description: "require cookie token",
    tags: ["projects"],
    request: {
    },
    responses: {
        200: {
            description: "Retrieve all projects data",
            content: {
                "application/json": {
                    schema: z.object({
                        data: z.array(
                            z.object({
                                id: z.string(),
                                name: z.string(),
                                description: z.string().nullable(),
                                create_at: z.string()
                            })
                        )
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

export const getProject = createRoute({
    method: "get",
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
            description: "Retrieve a project data",
            content: {
                "application/json": {
                    schema: z.object({
                        project: z.object({
                            name: z.string(),
                            description: z.string(),
                            id: z.string(),
                            create_at: z.string(),
                            api_key: z.string()
                        }),
                        flag: z.object({
                            name: z.string(),
                            note: z.string(),
                            development: z.boolean(),
                            production: z.boolean(),
                            show_note: z.boolean(),
                        })
                    })
                }
            }
        },
        401: {
            description: "Unauthorized"
        }
    }
})

export const createProject = createRoute({
    method: "post",
    path: "/",
    description: "require cookie token",
    tags: ["projects"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: z.object({
                        name: z.string().min(1).max(32),
                        description: z.string().optional()
                    })
                }
            }
        }
    },
    responses: {
        200: {
            description: "Create Project"
        },
        401: {
            description: "Unauthorized"
        }
    }
})