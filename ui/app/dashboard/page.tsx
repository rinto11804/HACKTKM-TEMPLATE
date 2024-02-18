"use client";

import { ActionIcon, Group, Loader, Select, Stack } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useGetProducts } from "../../backend/product/product.query";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";

export default function DashboardPage() {
    const router = useRouter()
    const { data: allProducts, isLoading } = useGetProducts()
    const products = allProducts?.map(({ description, id, image_url, name }) => ({ label: name, value: id }))
    console.log(products)
    const form = useForm({
        initialValues: {
            product: ""
        }
    })
    if (isLoading) return <Loader />
    return (
        <Stack flex={1} p={"xs"}>
            <Group wrap="nowrap" pt={3}>
                <Select searchable limit={5} w={"100%"} radius={"md"} data={products} placeholder="Search for products" size="sm"  {...form.getInputProps("product")} />
                <ActionIcon onClick={() => router.push(`/dashboard/${form.values.product}`)} size={"lg"} radius={"md"}><IconSearch size={15} /></ActionIcon>
            </Group>
        </Stack>
    )
}