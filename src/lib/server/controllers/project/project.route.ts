import { OpenAPIHono } from "@hono/zod-openapi";
import db from "@server/db";
import { createProject, deleteProject, getAllProject, getProject } from "./project.openapi";
import { FLAG, PROJECT } from "@server/db/schema";
import { verifyToken } from "@server/middlewares/auth";
import { cosineDistance, eq } from "drizzle-orm";

const route = new OpenAPIHono();

route.use("*", verifyToken)

route.openapi(deleteProject, async(c) => {
    console.log("I'm in")
    const {id} = c.req.valid("param")
    const query = await db.query.PROJECT.findFirst({
        where: eq(PROJECT.id, id)
    })
    console.log("project is", query)
    if(query == undefined) return c.json({message: "Not found"}, 404)

    await db.delete(PROJECT).where(eq(PROJECT.id, id))
    return c.json({message: "Deleted Project"}, 200)
})

route.openapi(createProject, async(c) => {
    const {name, description} = c.req.valid("json")
    await db.insert(PROJECT).values({name, description})
    return c.json({message: "Create projects"}, 200)
})

route.openapi(getAllProject, async(c) => {
    const queries = await db.query.PROJECT.findMany({
            columns: {
                name: true,
                description: true,
                id: true,
                create_at: true
            },
        })
    return c.json(queries, 200)
})

route.openapi(getProject, async(c) => {
    const {id} = c.req.valid("param")
    const query = await db.select({
        project: {
            name: PROJECT.name,
            api_key: PROJECT.api_key,
            description: PROJECT.description,
            id: PROJECT.id,
            create_at: PROJECT.create_at,
        },
        flag: {
            name: FLAG.name,
            note: FLAG.note,
            development: FLAG.development,
            production: FLAG.production,
            show_note: FLAG.show_note,
        }
    })
    .from(PROJECT)
    .where(eq(PROJECT.id, id))
    .leftJoin(FLAG, eq(FLAG.id, id))


    if (query.length == 0) return c.json({message: "Project Not Found"}, 404)

    return c.json(query[0], 200)
})

export default route