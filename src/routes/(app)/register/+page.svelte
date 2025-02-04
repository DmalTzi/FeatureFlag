<script lang="ts">
    import {Input} from "$lib/components/ui/input/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
    import * as Card from "$lib/components/ui/card/index.js";
</script>

<div class="container flex justify-center content-center mt-[5rem]">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Register</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="post">
                <div class="m-[1rem]">
                    <Label for="username">Your username</Label>
                    <Input type="text" name="username"/>
                </div>
                <div class="m-[1rem]">
                    <Label for="password">Your password</Label>
                    <Input type="password" name="password"/>
                </div>
                <div class="m-[1rem]">
                    <Input type="submit" value="register"/>
                </div>
                <div class="flex justify-center content-center">
                    <a href="/login" class="text-xs text-gray-700 underline">login</a>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div>