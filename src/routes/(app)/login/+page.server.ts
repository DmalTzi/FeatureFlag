import { createClient } from '@server/client'
import { redirect, type Actions } from '@sveltejs/kit'
import { setCookie } from 'hono/cookie';
import { toast } from 'svelte-sonner'

export const actions = {
    default: async({fetch, request}) => {
        const client:any = createClient(fetch)
        const form = await request.formData()
        
        const json = {
            username: form.get("username"),
            password: form.get("password")
        }
        
        const res = await client.simpleAuth.login.$post({
                json
            })
            
        if (res.status == 200) {
            redirect(303, "/")
        }
    }
} satisfies Actions;