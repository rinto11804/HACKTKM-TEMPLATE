"use client"
import { Divider, Group, Stack, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import styles from './styles.module.css';
import AddAssetModal from "./_components/AddAssetModal";
import AssetCard from "./_components/assetCard";
import { useAllAssetsByProducerId } from "../../../backend/_stashed/asset/asset.query";

export default function AssetPage() {
    const { data: allAssets } = useAllAssetsByProducerId()
    return (
        <Stack flex={1} p={"xs"}>
            <Group justify="space-between">
                <Title order={3}>Asset</Title>
                <Group>
                    <TextInput leftSection={<IconSearch />} placeholder="Search your assets" />
                    <AddAssetModal />
                </Group>
            </Group>
            <Group mt={"xs"}>
                {allAssets?.data?.map((props) => (
                    <AssetCard name={props.AssetType} status="active" id={props.ID} minify />
                ))}
            </Group>
        </Stack>
    )
}