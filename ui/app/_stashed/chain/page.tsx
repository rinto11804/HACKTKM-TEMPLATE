"use client";

import { Group, ScrollAreaAutosize, Stack } from "@mantine/core";
import { useAllAssetsByProducerId } from "../../../backend/_stashed/asset/asset.query";
import Graphin, { Behaviors } from '@antv/graphin';
import { useElementSize, useViewportSize } from '@mantine/hooks';
import AssetCard from "../assets/_components/assetCard";
const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default function ChainPage() {
    const { ref, width, height } = useElementSize();
    const { data: allAssets } = useAllAssetsByProducerId()
    const data = {
        nodes: [
            {
                id: 'root',
            },
            {
                id: 'node-0-root',

            },
            {
                id: 'node-1-root',

            },
            {
                id: 'node-2-root',
            },
        ],
        edges: [
            {
                source: 'node-0-root',
                target: 'root',
            },
            {
                source: 'node-1-root',
                target: 'root',
            },
            {
                source: 'node-2-root',
                target: 'root',
            },
            {
                source: 'node-1-root',
                target: 'root',
            }
        ],
    };
    return (
        <Group flex={1} h={"100vh"} mah={"100vh"} gap={0}>
            <ScrollAreaAutosize flex={0.3} w={260}>
                <Stack miw={250} p={"xs"}>
                    {allAssets?.data?.map((props) => (
                        <AssetCard name={props.AssetType} status="active" id={props.ID} minify />
                    ))}
                </Stack>
            </ScrollAreaAutosize>
            <Group flex={0.5} h={"100vh"} ref={ref} justify="center">
                <Graphin data={data} theme={{ mode: "dark" }} layout={{ type: "radial" }} width={500}>
                    <ZoomCanvas />
                </Graphin>
            </Group>
        </Group>
    )
}