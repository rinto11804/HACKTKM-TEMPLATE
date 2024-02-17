import { Badge, Group, Text } from '@mantine/core'
import styles from './styles.module.css'
export default function AssetCard(props: Asset) {
    return (
        <Group className={styles["asset-card-root"]}>
            <Text>{props.name}</Text>
            <Badge variant='outline' size='lg' color={props?.status === "inactive" ? "dark" : ""}>{props.status}</Badge>
        </Group>
    )
}