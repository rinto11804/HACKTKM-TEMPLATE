import { Flex } from "@mantine/core";
import Navbar from "./_components/navbar";

export default function DashboardLayout({ children }: { children: any }) {
    return (
        <Flex h={"100vh"} align={"start"}>
            <Navbar />
            {children}
        </Flex>
    )
}