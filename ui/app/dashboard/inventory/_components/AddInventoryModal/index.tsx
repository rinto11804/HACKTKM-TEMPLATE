"use client";

import { useDisclosure } from "@mantine/hooks";
import { CustomModalLayout } from "../../../../../components/CustomModal";
import { Button, Group, NumberInput, Select, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import styles from './styles.module.css';
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useAddInventoryByUserId } from "../../../../../backend/inventory/inventory.query";
import { useGetProducts } from "../../../../../backend/product/product.query";

export default function AddInventoryModal() {
    const [opened, { open, close }] = useDisclosure(false)
    const addInventory = useAddInventoryByUserId(JSON.parse(localStorage.getItem("user") as string)?.id)
    const { data: allProducts, isLoading } = useGetProducts()
    const products = allProducts?.map(({ description, id, image_url, name }) => ({ label: name, value: id }))
    const form = useForm({
        initialValues: {
            product_id: "",
            amount: 0,
            latitude: "",
            longitude: ""
        }
    })
    function onSubmit(values: any) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            form.setFieldValue("latitude", latitude.toString())
            form.setFieldValue("longitude", longitude.toString())
            addInventory.mutate(form.values, {
                onSuccess: () => {
                    form.resetDirty()
                    form.reset()
                    close()
                }
            })
        }
        )

    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition
    }, [])
    if (isLoading) return <> Loading...</>
    return (
        <>
            <CustomModalLayout opened={opened} onClose={close} size={"lg"} title="Add in inventory" subtitle="Add items to your inventory">
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <Stack gap={"xs"}>
                        <Select classNames={styles} label="Product" placeholder="Select product" data={products} {...form.getInputProps("product_id")} />
                        <Group>
                            <NumberInput classNames={styles} label="Amount" {...form.getInputProps("amount")} style={{ flex: 1 }} />
                            <TextInput classNames={styles} label="Unit" value={"kg"} disabled />
                        </Group>
                        <Button onClick={open} c="dark" radius={"md"} type="submit" disabled={!form.isDirty("product_id") && !form.isDirty("amount")}>Add</Button>
                    </Stack>
                </form>
            </CustomModalLayout >
            <Button rightSection={<IconPlus />} className={styles["button"]} onClick={open} radius={"md"}>Add</Button>
        </>
    )
}