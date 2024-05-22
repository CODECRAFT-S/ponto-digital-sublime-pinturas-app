import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from "./styles";

interface btnProps {
    text: String;
    disable?: boolean;
    onPress?: Function;
}

export default function ButtonConfirm({
    text = "",
    disable = false,
    onPress = () => {},
}: btnProps) {
    return (
        <TouchableOpacity
            style={[styles.btn, { opacity: disable ? 0.31 : 1 }]}
            onPress={() => onPress()}
            disabled={disable ? true : false}
        >
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );
}
