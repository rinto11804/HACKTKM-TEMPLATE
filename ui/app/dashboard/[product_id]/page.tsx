"use client";

import { ActionIcon, Avatar, Group, Image, Loader, Paper, Select, Stack, Text, Title, Flex, Badge, Indicator, ScrollAreaAutosize } from "@mantine/core";
import { useGetJsonForHistoryByProductId, useGetProductById, useGetProducts } from "../../../backend/product/product.query";
import { useParams, useRouter } from "next/navigation";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { LineChart } from '@mantine/charts';
import { useEffect, useState } from "react";

export default function ProductIdPage() {
    const router = useRouter();
    const { product_id } = useParams() as { product_id: string }
    const { data: allProducts, isLoading: IsLoading } = useGetProducts()
    const { data: productById, isError, isLoading } = useGetProductById(product_id)
    console.log(productById)
    const products = allProducts?.map(({ description, id, image_url, name }) => ({ label: name, value: id }))
    const form = useForm({
        initialValues: {
            product: ""
        }
    })
    if (isLoading || IsLoading) return <Loader />
    if (isError) router.push("/dashboard");


    return (
        <Stack flex={1} h="100vh" align="start" px={"sm"} py={"md"} gap={2}>
            <Flex px={"lg"} w={"100%"} wrap="nowrap" gap={8} justify="between">
                <ActionIcon size={"lg"} onClick={() => router.back()}><IconChevronLeft /></ActionIcon>
                <Select searchable limit={5} w={"100%"} radius={"md"} data={products} placeholder="Search for products" size="sm"  {...form.getInputProps("product")} />
                <ActionIcon onClick={() => router.push(`/dashboard/${form.values.product}`)} size={"lg"} radius={"md"}><IconSearch size={15} /></ActionIcon>
            </Flex>
            <ScrollAreaAutosize w={"100%"}>
                <Stack flex={1} p="md" w={"100%"}>
                    <Paper p={"lg"} withBorder w={"100%"}>
                        <Group align="start">
                            <Avatar src={productById?.image_url} size={200} radius={"lg"} />
                            <Stack>
                                <Title>{productById?.name}</Title>
                                <Text c="dimmed">{productById?.description}</Text>
                                <Group>
                                    <Indicator processing position="top-start">
                                        <Paper shadow="xs" withBorder p={"md"}>
                                            <Group>
                                                <Text size="sm" fw={600}>Enrut Demand</Text>
                                                <Badge variant="light" size="lg">{productById?.total_enrute_demand}</Badge>
                                            </Group>
                                        </Paper>
                                    </Indicator>
                                    <Paper shadow="xs" p={"md"} withBorder>
                                        <Group>
                                            <Text size="sm">Total Demand</Text>
                                            <Badge variant="light">{productById?.total_enrute_demand}</Badge>
                                        </Group>
                                    </Paper>
                                </Group>
                            </Stack>
                        </Group>
                    </Paper>
                    <History />
                </Stack>
            </ScrollAreaAutosize>
        </Stack >
    )
}
const History = () => {
    const [selectedDistrict, setSelectedDistrict] = useState<string>();
    const { product_id } = useParams() as { product_id: string }
    const { data: history, isLoading } = useGetJsonForHistoryByProductId(product_id)
    const dropDownData = history?.map(({ district }) => ({ value: district, label: district }))
    console.log(history)
    useEffect(() => {
        if (history && dropDownData) {
            setSelectedDistrict(dropDownData[0].label)
        }
    }, [history])
    if (isLoading) {
        return <Loader />
    }
    return (
        <Stack>
            <Group justify="space-between">
                <Text>Historical Data</Text>
                <Select data={dropDownData} label="Choose District" defaultValue={dropDownData && dropDownData[0].value} value={selectedDistrict} onChange={(value) => setSelectedDistrict(value as string)} />
            </Group>
            {history && <LineChart
                h={300}
                data={history?.find(({ data, district }) => district === selectedDistrict)?.data}
                dataKey="date"
                series={[
                    { name: 'price', color: 'indigo.6' },
                ]}
                curveType="linear"
            />}
        </Stack>
    )
}