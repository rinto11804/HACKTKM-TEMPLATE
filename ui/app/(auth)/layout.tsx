import { Flex, Group, Image } from "@mantine/core";

export default function AuthLayout({ children }: { children: any }) {

    return (
        <Flex h={"100vh"}>
            <Group flex={1} justify="center">
                <Image src={'./logo.png'} w={200} />
            </Group>
            <Group flex={1}>{children}</Group>
        </Flex>
    )
}