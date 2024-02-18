'use client';

import { Group, ScrollArea, rem, Box, ThemeIcon, Collapse, Image, UnstyledButton, Avatar, Text, Badge, Menu, MenuTarget, ActionIcon, } from '@mantine/core';
import { IconGauge, IconChevronRight, IconSettings, IconLogout, IconBasket } from '@tabler/icons-react';
import classes from './navbar.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetUserById } from '../../../../backend/product/product.query';

const navbarData = [
    {
        label: 'Dashboard',
        link: '/dashboard',
        icon: IconGauge,
    },
    {
        label: 'Inventory',
        link: '/dashboard/inventory',
        icon: IconBasket,
    },
];





export default function Navbar() {
    const links = navbarData.map((item) => <LinksGroup {...item} key={item.label} />);
    const { data } = useGetUserById(JSON.parse(localStorage.getItem('user') as string)?.id)
    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Image
                        src={`/logo.png`}
                        w={128}
                        fit="contain"
                    />
                    <Badge fw={600} variant='light'>{data?.role}</Badge>
                </Group>
            </div>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
            <div className={classes.footer}>
                <UserNavCard email={data?.email as string}
                    id={data?.id as string}
                    name={data?.name as string}
                    profile_pic={data?.profile_pic as string}
                />
            </div>
        </nav>
    );
}

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link: string;
    links?: { label: string; link: string }[];
}

function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Link className={classes.link} href={link.link} key={link.label}>
            {link.label}
        </Link>
    ));

    return (
        <>
            <Link href={link ?? ''} onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="transparent" size={20}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(15),
                                height: rem(15),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </Link>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

const UserNavCard = (props: Omit<User, "role">) => {
    const router = useRouter();
    async function logout() {
        localStorage.removeItem('user');
        router.push('/login');
    }
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src={props.profile_pic}
                    radius="xl"
                />
                <div style={{ flex: 1 }}>
                    <Text size="xs" fw={500} fz={16}>
                        {props.name}
                    </Text>
                    <Text c="dimmed" fz={12} maw={"100px"} truncate>
                        {props.email}
                    </Text>
                </div>
                <Menu withArrow position='bottom-start' width={200} shadow='sm'>
                    <MenuTarget>
                        <ActionIcon variant='light'>
                            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
                        </ActionIcon>
                    </MenuTarget>
                    <Menu.Dropdown>
                        <Menu.Item>
                            <Group>
                                <Avatar
                                    src={props.profile_pic}
                                    radius="xl"
                                />
                                <div style={{ flex: 1 }}>
                                    <Text size="xs" fw={500} fz={16}>
                                        {props.name}
                                    </Text>
                                    <Text c="dimmed" fz={12}>
                                        {props.email}
                                    </Text>
                                </div>
                            </Group>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item leftSection={<ThemeIcon variant="transparent" size={20}>
                            <IconSettings />
                        </ThemeIcon>}>
                            <Text size='sm' fw={500} onClick={() => router.push("/dashboard/settings")}>Settings</Text>
                        </Menu.Item>
                        <Menu.Item leftSection={<ThemeIcon variant="transparent" size={20}>
                            <IconLogout />
                        </ThemeIcon>}>
                            <Text size='sm' fw={500} onClick={logout}>Logout</Text>
                        </Menu.Item>
                        <Menu.Divider />
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </UnstyledButton >
    )
}