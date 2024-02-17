"use client";

import { useDisclosure } from "@mantine/hooks";
import { CustomModalLayout } from "../../../../../components/CustomModal";
import { ActionIcon, Button, Divider, Group, NumberInput, Select, Stack, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import styles from './styles.module.css';
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useAllAssets, usePostAssets } from "../../../../../backend/asset/asset.query";

export default function AddAssetModal() {
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [opened, { open, close }] = useDisclosure(false)
    const { data: allAssets, isLoading } = useAllAssets()
    console.log(allAssets)
    const postAssets = usePostAssets();
    const assetTypes = allAssets?.data.map((asset) => ({ label: asset.AssetType, value: asset.ID }))
    const topAssetTypes = allAssets?.data.map((asset) => ({ label: asset.AssetType, value: asset.AssetType }))
    const Units = [
        {
            label: "Kilo Gram",
            value: "kg"
        },
        {
            label: "Ton",
            value: "ton"
        },
        {
            label: "Pound",
            value: "pound"
        },
        {
            label: "Grams",
            value: "g"
        }
    ]
    const form = useForm({
        initialValues: {
            asset_type: "",
            production_amount: 0,
            producer_id: JSON?.parse(localStorage.getItem("user") as string)?.id,
            incoming_assets: [],
        }
    })

    function createInputDataArray(asset_id: string, quantity: number) {
        form.setValues({ incoming_assets: [...form.values.incoming_assets, { asset_id: asset_id, quantity: quantity }] as any })
    }
    function onSubmit(values: any) {
        const data = {
            ...values,
            production_amount: parseInt(values.production_amount),

        }
        postAssets.mutate(data)
    }
    console.log(form.values)
    if (isLoading) return <> Loading...</>
    return (
        <>
            <CustomModalLayout opened={opened} onClose={close} size={"lg"} title="Add Asset" subtitle="Add assets to your dashboard">
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <Stack gap={"xs"}>
                        <TextInput label="Asset Type" placeholder="Select asset type" classNames={styles}  {...form.getInputProps("asset_type")} />
                        <Divider label="Production Data" labelPosition="left" />
                        <Group align="end">
                            <NumberInput classNames={styles} label="Quantity" maw={"100%"} style={{ flex: 1 }} {...form.getInputProps("production_amount")} />
                            <Select classNames={styles} value={"kg"} data={Units} label="Unit" allowDeselect={false} disabled />
                        </Group>
                        <Divider label="Input Data" labelPosition="left" />
                        <Stack gap={"xs"}>
                            {form.values.incoming_assets.map((data: any, index: number) => {
                                if (data !== null) return (
                                    <Group key={index} align="end">
                                        <TextInput classNames={styles} style={{ flex: 1 }} disabled value={data.item} />
                                        <TextInput classNames={styles} style={{ flex: 0.6 }} disabled value={data.quantity} />
                                        <Select classNames={styles} style={{ flex: 0.5 }} defaultValue={"kg"} allowDeselect={false} disabled />
                                    </Group>
                                )
                            })}
                        </Stack>
                        <Group>
                            <Select data={assetTypes} classNames={styles} style={{ flex: 1 }} label="Item" value={item} onChange={(value) => setItem(value as string)} />
                            <NumberInput classNames={styles} style={{ flex: 0.6 }} label="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e as string))} />
                            <Select data={Units} classNames={styles} style={{ flex: 0.5 }} label="Unit" defaultValue={"kg"} allowDeselect={false} disabled />
                        </Group>
                        <ActionIcon onClick={() => createInputDataArray(item, quantity)} classNames={styles} variant="outline" color="gray" radius="md" size="md" style={{ alignSelf: "flex-end" }} >
                            <IconPlus />
                        </ActionIcon>
                        <Button onClick={open} c="dark" radius={"md"} type="submit">Create Asset</Button>
                    </Stack>
                </form>
            </CustomModalLayout >
            <Button rightSection={<IconPlus />} className={styles["button"]} c="dark" onClick={open} radius={"md"}>Add Asset</Button>
        </>
    )
}