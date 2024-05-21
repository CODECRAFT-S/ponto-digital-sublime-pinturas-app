import React from "react";
import { Image } from 'expo-image';
import { View } from "react-native";

import styles from "./styles";

import logoSP from "@image/logo.svg"

export default function Login() {
    return(
        <View style={styles.container}>
            <Image
            style={styles.logo}
            source={logoSP}
            />
        </View>
    )
}