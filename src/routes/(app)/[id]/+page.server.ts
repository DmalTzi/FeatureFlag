import { createClient } from '@server/client'
import { cookieName } from '@server/constants.js'
import { redirect, type Actions } from '@sveltejs/kit';
import { toast } from "svelte-sonner";

export const load = async({fetch, params}) => {
    let project = []

    const client:any = createClient(fetch)
    const res = await client.project[params.id].$get()

    if (res.status == 200){
        project = await res.json()
    }

    return {
        project: project.project,
        flag: project.flag,
        loading: true
    }
}

export const actions = {
    createFlag: async({fetch, request}) => {
        const client:any = createClient(fetch)
        const form = await request.formData()
        const id = form.get("id")
        const json = {
            name: form.get("name"),
            note: form.get("note")
        }
        
        await client.flag[':id'].$post({
            param: {id},
            json
        })
    },

    deleteProject: async({request, fetch}) => {
        const client:any = createClient(fetch)
        const form = await request.formData()
        const id = form.get("id")

        
        const response = await client.project[':id'].$delete({
            param: {id},
        })

        if(response.status == 200){
            redirect(303, "/")
        }
    },
    deleteFlag: async({request, fetch}) => {
        const client:any = createClient(fetch)
        const form = await request.formData()
        const id = form.get("id")
        
        await client.flag[':id'].$delete({
            param: {id},
        })

    },
}satisfies Actions;