import { OpenAPIHono } from "@hono/zod-openapi";
import { loginSimpleAuth, registerSimpleAuth } from "./simpleAuth.openapi";
import crypto from "crypto"
import db from "@server/db";
import { SIMPLEAUTH } from "@server/db/schema";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { env } from "$env/dynamic/private";
import { setCookie } from "hono/cookie";
import { cookieName } from "@server/constants";

const route = new OpenAPIHono();

route.openapi(registerSimpleAuth, async(c) => {
    const {username, password} = c.req.valid("json")
    const search = await db.selectDistinct({username: SIMPLEAUTH.username}).from(SIMPLEAUTH).where(eq(SIMPLEAUTH.username, username))
    if (search.length != 0) return c.json({message: "This username areadly exsit"}, 403)
        const hash = crypto.createHash("sha256").update(crypto.createHash("sha256").update(password).digest("hex")).digest("hex")

    await db.insert(SIMPLEAUTH).values({username, password:hash})  
    return c.json({message: "Register Successsful"}, 200)
})

route.openapi(loginSimpleAuth, async(c) => {
    const {username, password} = c.req.valid("json")

    const search = await db.selectDistinct().from(SIMPLEAUTH).where(eq(SIMPLEAUTH.username, username))
    if (search.length == 0) return c.json({message: "incorrect username or password"}, 403)

    const hash = crypto.createHash("sha256").update(crypto.createHash("sha256").update(password).digest("hex")).digest("hex")
    if (search[0].password != hash) return c.json({message: "incorrect username or password"}, 403)

    const token:string = await sign({
        username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
    }, env.SECRET_KEY!)

    setCookie(c, cookieName, token,{path:"/"})

    return c.json({"message":"login successful", token}, 200)
})

export default route;