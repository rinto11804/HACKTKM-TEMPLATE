"use client";

import { Group, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import AddInventoryModal from "./_components/AddInventoryModal";
import { useInventoriesByUserId } from "../../../backend/inventory/inventory.query";
import { useGetProducts } from "../../../backend/product/product.query";
import InventoryCard from "./_components/InventoryCard";

export default function InventoryPage() {
    const { data: inventories } = useInventoriesByUserId(JSON?.parse(localStorage?.getItem("user") as string)?.id)
    const { data: allProducts } = useGetProducts()
    return (
        <Stack flex={1} p={"xs"}>
            <Group justify="space-between">
                <Title order={3}>Inventory</Title>
                <Group>
                    <TextInput leftSection={<IconSearch />} placeholder="Search in your inventory" />
                    <AddInventoryModal />
                </Group>
            </Group>
            <Group>
                {inventories?.map((inventory) => (
                    <InventoryCard {...inventory} name={allProducts?.find((product) => product.id === inventory.product_id)?.name as string} />
                ))}
            </Group>
        </Stack>
    )
}