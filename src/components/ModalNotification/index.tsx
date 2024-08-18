import React, { useEffect, useRef } from "react";
import { Modal, Text } from "react-native-paper";
import { View, Animated, Easing } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

import styles from "./styles";
import { Colors } from "@constants/Colors";

interface ModalDetails {
    mensagem: String;
    status: "Success" | "Fail" | "Alert" | "Loading";
    timeVisable: number | null;
    visible: boolean;
    onDismiss: () => void;
}

export default function ModalNotification({
    mensagem,
    status,
    timeVisable = null,
    visible,
    onDismiss,
}: ModalDetails) {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible && timeVisable !== null) {
            const timer = setTimeout(onDismiss, timeVisable);
            return () => clearTimeout(timer);
        }
    }, [visible, timeVisable, onDismiss]);

    useEffect(() => {
        const spin = () => {
            spinValue.setValue(0);
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => spin());
        };

        if (status === "Loading") {
            spin();
        }

        return () => spinValue.stopAnimation(); // Stop animation on unmount
    }, [spinValue, status]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <Modal
            visible={visible}
            onDismiss={onDismiss}
            contentContainerStyle={styles.modalMensagem}
        >
            {status === "Success" ? (
                <Octicons name="verified" size={50} color={Colors.text.green} />
            ) : status === "Fail" ? (
                <FontAwesome name="close" size={50} color={Colors.text.red} />
            ) : status === "Loading" ? (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <AntDesign name="loading1" size={50} color="white" />
                </Animated.View>
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
