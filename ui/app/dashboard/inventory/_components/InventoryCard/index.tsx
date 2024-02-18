import { Badge, Divider, Group, Paper, Stack, Text } from '@mantine/core'
import styles from './styles.module.css'

interface Props extends Partial<Inventory> {
    name: string;
}
export default function InventoryCard(props: Props) {
    return (
        <Paper className={styles["asset-card-root"]} shadow='xs'>
            <Stack w={"100%"} gap={5}>
                <Group justify='space-between'>
                    <Text>{props.name}</Text>
                    <Text size='xs' c="dimmed">#{props?.id}</Text>
                </Group>
                <Divider variant='dashed' />
                <Group justify="space-between">
                    <Badge variant="filled" size="sm">In Stock</Badge>
                    <Text>{props.amount} kg</Text>
                </Group>
            </Stack>
        </Paper>
    )
}