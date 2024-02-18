"use client";

import { Anchor, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useLogin } from "../../../backend/user/user.query";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const login = useLogin()
    const form = useForm({
        initialValues: {
            email: "",
        }
    })
    function onSubmit(values: { email: string }) {
        login.mutate(values, { onSuccess: () => router.push('/dashboard') })
    }
    return (
        <Container miw={400}>
            <Title ta="center" >
                Welcome!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component={Link} href={'/signup'} >
                    Create account
                </Anchor>
            </Text>
            <form onSubmit={form.onSubmit(values => onSubmit(values))}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Email" placeholder="Enter email" required {...form.getInputProps("email")} />
                    <PasswordInput label="Password" placeholder="Enter password" required mt="md" />
                    <Button fullWidth mt="xl" c="dark" type="submit">
                        Login
                    </Button>
                </Paper>
            </form>
        </Container>

    )
}