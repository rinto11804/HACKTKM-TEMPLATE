import { Anchor, Button, Container, Divider, Image, NavLink, Stack } from "@mantine/core";
import { IconBasket, IconDashboard, IconGitBranch } from '@tabler/icons-react'
import styles from './styles.module.css'
import Link from "next/link";
export default function Navbar() {
    return (
        <Container className={styles["root"]}>
            <Stack>
                <Image src={"/logo.png"} w={100} />
                <Divider />
                <Stack>
                    <NavLink href={'/dashboard'} label="Analytics" className={styles["link"]} leftSection={<IconDashboard />} component={Link} active />
                    <NavLink href={'/dashboard/assets'} label="Assets" className={styles["link"]} leftSection={<IconBasket />} component={Link} />
                    <NavLink href={'/dashboard/chain'} label="Chains" className={styles["link"]} leftSection={<IconGitBranch />} component={Link} />
                </Stack>
            </Stack>
        </Container>
    )
}