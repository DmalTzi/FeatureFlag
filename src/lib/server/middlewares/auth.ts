import { env } from "$env/dynamic/private";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";

export const verifyToken = async(c:any, next: any) => {
    const token = c.req.header("Authorization")?.split("Bearer ")[1] ?? getCookie(c, "token");
    
    if (!token) throw new HTTPException(401, { message: 'Unauthorized' })

    let payload: JWTPayload | undefined = undefined

    try {
        payload = await verify(token, env.SECRET_KEY)
    }catch (error) {}

    if (!payload) throw new HTTPException(401, { message: 'Unauthorized' })

    c.set("payload",payload)
    await next()
}