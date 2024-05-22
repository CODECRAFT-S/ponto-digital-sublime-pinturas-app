import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "./styles";

interface btnProps {
    text: String
}

export default function ButtonConfirm({ text }: btnProps) {
    return (
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>{ text }</Text>
        </TouchableOpacity>
    );
}
