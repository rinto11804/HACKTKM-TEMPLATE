import { Modal, ModalProps, Text } from '@mantine/core'
import styles from './styles.module.css'

interface CustomModalLayoutProps {
    onClose: () => void;
    opened: boolean;
    children: any;
    header?: any;
    title?: string;
    subtitle?: string;
    size?: ModalProps["size"];
}
export function CustomModalLayout(props: CustomModalLayoutProps) {
    return (
        <Modal opened={props.opened} onClose={props.onClose} classNames={styles} title={props?.title} size={props?.size}>
            {props?.header && <Modal.Header>{props?.header}</Modal.Header>}
            <Modal.Body>
                {props?.subtitle && <Text className={styles["subtitle"]}>{props?.subtitle}</Text>}
                {props.children}
            </Modal.Body>
        </Modal >
    )
}