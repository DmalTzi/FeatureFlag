<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    let { data } = $props();
    let loading = $state(data.loading);
    let show_note = $state(false)
    let production = $state(false)
    let development = $state(false)

    if(data.loading && data.flag) {
        show_note = data.flag.show_note
        production = data.flag.production
        development = data.flag.development
    }

    const update = async(id:string) => {
        console.log(id)
        await fetch(`/api/flag/${id}`, {
            method: "put",
            body: JSON.stringify({show_note, production, development}),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

</script>

<div class="container flex justify-center content-center mt-[5rem]">
    <Card.Root>
        {#if loading}
            <Card.Header>
                <Card.Title>{data.project.name}</Card.Title>
                <Card.Description>{data.project.description}</Card.Description>
            </Card.Header>
            <Card.Content>
                <div>id : {data.project.id}</div>
                <div>
                    create_at : {new Date(
                        data.project.create_at,
                    ).toLocaleString()}
                </div>
                <hr />
                {#if data.flag}
                    <div>
                        <div>api_key : {data.project.api_key}</div>
                        <div>flag name : {data.flag.name}</div>
                        <div
                            class="flex justify-between content-center mt-[.2rem]"
                        >
                            <span>production</span>
                            <Switch
                                bind:checked={() => development,
                                (newState) => {
                                    development = newState;
                                    update(data.project.id);
                                }}
                            />
                        </div>
                        <div
                            class="flex justify-between content-center mt-[.2rem]"
                        >
                            <span>production</span>
                            <Switch
                                bind:checked={() => production,
                                (newState) => {
                                    production = newState;
                                    update(data.project.id);
                                }}
                            />
                        </div>
                        <div
                            class="flex justify-between content-center mt-[.2rem]"
                        >
                            <span>show_note</span>
                            <Switch
                                bind:checked={() => show_note,
                                (newState) => {
                                    show_note = newState;
                                    update(data.project.id);
                                }}
                            />
                        </div>
                        {#if show_note}
                            <div>
                                <Label>note</Label>
                                <Textarea value={data.flag.note} />
                            </div>
                        {/if}

                        <form
                            method="post"
                            action="?/deleteFlag"
                            class="mt-[1rem]"
                        >
                            <Input
                                type="hidden"
                                name="id"
                                value={data.project.id}
                            />
                            <Input
                                type="submit"
                                value="Delete Flag"
                                class="bg-red-500"
                            />
                        </form>
                    </div>
                {:else}
                    <div class="flex justify-center content-center mt-[1rem]">
                        <Dialog.Root>
                            <Dialog.Trigger
                                ><Input
                                    type="button"
                                    value="Create Flag"
                                    class="bg-blue-500"
                                /></Dialog.Trigger
                            >
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Create Flag</Dialog.Title>
                                    <form method="post" action="?/createFlag">
                                        <Input
                                            type="hidden"
                                            name="id"
                                            value={data.project.id}
                                        />
                                        <div class="m-[1rem]">
                                            <Label for="name">Flag name</Label>
                                            <Input type="text" name="name" />
                                        </div>
                                        <div class="m-[1rem]">
                                            <Label for="note">note</Label>
                                            <Textarea name="note" />
                                        </div>
                                        <div class="m-[1rem]">
                                            <Input
                                                type="submit"
                                                value="Submit"
                                                class="bg-blue-500"
                                            />
                                        </div>
                                    </form>
                                </Dialog.Header>
                            </Dialog.Content>
                        </Dialog.Root>
                        <form method="post" action="?/deleteProject">
                            <Input
                                type="hidden"
                                name="id"
                                value={data.project.id}
                            />
                            <Input
                                type="submit"
                                value="Delete Project"
                                class="bg-red-500"
                            />
                        </form>
                    </div>
                {/if}
            </Card.Content>
        {:else}
            Loading...
        {/if}
    </Card.Root>
</div>
