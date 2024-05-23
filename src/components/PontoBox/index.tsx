import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";

import styles from "./styles";
import { Colors } from "@constants/Colors";

interface PontoBoxProps {
    data: String;
    time: String;
    status?: boolean;
}

export default function PontoBox({
    data = "00/00/0000",
    time = "00:00",
    status = false,
}: PontoBoxProps) {
    return (
        <View style={styles.container}>
            <View style={styles.pontoDetails}>
                <Text style={styles.pontoTimeText} variant="labelLarge">
                    Data: {data}
                </Text>
                <Text style={styles.pontoTimeText} variant="labelLarge">
                    Hora: {time}
                </Text>
            </View>
            <View style={styles.pontoStatus}>
                {status ? (
                    <Octicons
                        name="verified"
                        size={24}
                        color={Colors.text.green}
                    />
                ) : (
                    <Octicons
                        name="history"
                        size={24}
                        color={Colors.text.gray}
                    />
                )}
            </View>
        </View>
    );
}
