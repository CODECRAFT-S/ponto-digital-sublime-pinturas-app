import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from "./styles";

interface btnProps {
    text: String
    disable?: boolean
}

export default function ButtonConfirm({ text="", disable=false }: btnProps) {
    return (
        <TouchableOpacity 
        style={[styles.btn, {opacity: disable ? 0.31 : 1}]}
        disabled={disable ? true : false}
        >
            <Text style={styles.btnText}>{ text }</Text>
        </TouchableOpacity>
    );
}
