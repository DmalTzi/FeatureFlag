import { createClient } from '@server/client'
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async({fetch, request, cookies}) => {
    let projects = []

    const client:any = createClient(fetch)
    const res = await client.project.all.$get()

    if (res.status == 200){
        projects = await res.json()
    }else if (res.status == 401) {
        redirect(303, "/login")
    }

    return {
        projects
    }
    
}

export const actions = {
    createProject: async({fetch, request}) => {
        const client:any = createClient(fetch)
        const form = await request.formData()
        const json = {
            name: form.get("name"),
            description: form.get("description")
        }
        
        await client.project.$post({
            json
        })


    },
}satisfies Actions;