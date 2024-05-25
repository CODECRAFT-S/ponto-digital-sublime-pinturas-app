import React, { useEffect, useState } from "react";
import { Modal, Text } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { Colors } from "@constants/Colors";

interface ModalDetails {
    mensagem: String;
    status: "Sucess" | "Fail" | "Alert";
    timeVisable: number;
}

export default function ModalNotification({
    mensagem,
    status,
    timeVisable,
}: ModalDetails) {
    const [visibleModal, setVisibleModal] = useState(true);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    function showModalMensagem() {
        showModal();
        setTimeout(function () {
            hideModal();
        }, timeVisable);
    }

    // useEffect(()=>{
    //     showModalMensagem()
    // },[])

    return (
        <Modal
            visible={visibleModal}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalMensagem}
        >
            {status == "Sucess" ? (
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
