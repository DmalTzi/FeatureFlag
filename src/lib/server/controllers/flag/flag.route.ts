import { OpenAPIHono } from "@hono/zod-openapi";
import { createFlag, deleteFlag, getFlag, toggleFlag } from "./flag.openapi";
import { verifyToken } from "@server/middlewares/auth";
import db from "@server/db";
import { FLAG } from "@server/db/schema";
import { eq } from "drizzle-orm";

const route = new OpenAPIHono()

route.use(verifyToken)

route.openapi(deleteFlag, async(c) => {
    const {id} = c.req.valid("param")
    const query = await db.query.FLAG.findFirst({
        where: eq(FLAG.id, id)
    })

    if(query == undefined) return c.json({message: "Not found"}, 404)
    await db.delete(FLAG).where(eq(FLAG.id, id))
    return c.json({message: "Deleted Flag"}, 200)
})

route.openapi(getFlag, async(c) => {
    const {id} = c.req.valid("param")
    const query = await db.query.FLAG.findFirst({
        where: eq(FLAG.id, id)
    })

    if (!query) return c.json({message:"Not found"}, 404)

    return c.json(query, 200)
})

route.openapi(toggleFlag, async(c) => {
    const {id} = c.req.valid("param")
    const {development, production, show_note} = c.req.valid("json")
    const query = await db.query.FLAG.findFirst({
        where: eq(FLAG.id, id)
    })

    if (!query) return c.json({message: "Not Found"}, 200) 

    await db.update(FLAG).set({
        development,
        production,
        show_note
    })
    
    return c.json({message: "OK"}, 200)
})

route.openapi(createFlag, async(c) => {
    const {id} = c.req.valid("param")
    const {name, note} = c.req.valid("json")

    const query = await db.query.FLAG.findFirst({
        where: eq(FLAG.id, id)
    })

    if(query) return c.json({message:"already exsit"})

    await db.insert(FLAG).values({
        id,
        name,
        note
    })


    return c.json({message:"create flag"},200)
})

export default route;