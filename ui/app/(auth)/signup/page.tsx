"use client";

import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import Link from "next/link";
import { useRegister } from "../../../backend/user/user.query";
import { useRouter } from "next/navigation";

export default function SignuPPage() {
    const createProducer = useRegister()
    const router = useRouter();
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
        }
    });
    function onSubmit(values: { name: string, email: string }) {
        createProducer.mutate(values, {
            onSuccess: () => {
                router.push('/login')
            }
        })
    }
    return (
        <Container miw={400}>
            <Title ta="center" >
                Welcome!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component={Link} href={'/login'}>
                    Sign in instead
                </Anchor>
            </Text>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput label="Full Name" placeholder="John Doe" required {...form.getInputProps("name")} />
                    <TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps("email")} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                    <Button fullWidth mt="xl" type="submit">
                        Sign up
                    </Button>
                </Paper>
            </form>
        </Container>

    )
}