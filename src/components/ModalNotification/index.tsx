import React, { useEffect, useState } from "react";
import { Modal, Text } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { Colors } from "@constants/Colors";

interface ModalDetails {
    mensagem: String;
    status: "Success" | "Fail" | "Alert";
    timeVisable: number;
    visible: boolean;
    onDismiss: () => void;
}

export default function ModalNotification({
    mensagem,
    status,
    timeVisable,
    visible,
    onDismiss,
}: ModalDetails) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onDismiss, timeVisable);
            return () => clearTimeout(timer);
        }
    }, [visible, timeVisable, onDismiss]);

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={styles.modalMensagem}
        >
            {status == "Success" ? (
                <Octicons name="verified" size={50} color={Colors.text.green} />
            ) : status == "Fail" ? (
                <FontAwesome name="close" size={50} color={Colors.text.red} />
            ) : (
                <Feather
                    name="alert-triangle"
                    size={50}
                    color={Colors.text.yellow}
                />
            )}

            <Text variant="titleSmall" style={styles.textModal}>
                {mensagem}
            </Text>
        </Modal>
    );
}
