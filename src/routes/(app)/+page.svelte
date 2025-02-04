<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    let { data } = $props();
</script>

<div class="container flex flex-col justify-center items-center">
    <Dialog.Root>
        <Dialog.Trigger><Input type="button" value="Create Project" class="bg-blue-500 mt-[1rem]"/></Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Create</Dialog.Title>
                <form method="post" action="?/createProject">
                    <div class="m-[1rem]">
                        <Label for="name">project name</Label>
                        <Input type="text" name="name" />
                    </div>
                    <div class="m-[1rem]">
                        <Label for="description">description</Label>
                        <Textarea name="description" />
                    </div>
                    <div class="m-[1rem]">
                        <Input type="submit" value="Submit" class="bg-blue-500"/>
                    </div>
                </form>
            </Dialog.Header>
        </Dialog.Content>
    </Dialog.Root>

    {#each data.projects as project}
        <Card.Root class="w-[70%] m-[1rem]">
            <a href={project.id}>
                <Card.Content>
                    <div>id : {project.id}</div>
                    <div>name : {project.name}</div>
                    <div>description : {project.description}</div>
                </Card.Content>
            </a>
        </Card.Root>
    {/each}
</div>
