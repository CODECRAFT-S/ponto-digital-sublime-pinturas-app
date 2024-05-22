import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";

export default function BaterPonto() {
    return (
        <View style={styles.container}>
            <View style={styles.headerPage}>
                <View style={styles.welcomeUser}>
                    <TextPaper
                        variant="labelLarge"
                        style={[styles.textUser, { fontWeight: "400" }]}
                    >
                        Olá,{" "}
                    </TextPaper>
                    <TextPaper
                        variant="labelLarge"
                        style={[styles.textUser, { fontWeight: "bold" }]}
                    >
                        Nome Do Funcionário
                    </TextPaper>
                </View>
                <TouchableOpacity>
                    <FontAwesome
                        name="power-off"
                        size={25}
                        color={Colors.text.yellow}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.timeCurrent}>
                <Text style={styles.time}>16:12</Text>
                <TextPaper variant="labelSmall" style={{color: Colors.text.secudary}}>18 de Abril, 2024</TextPaper>
            </View>
            <View style={styles.btnPonto}>
                <ButtonConfirm text="Bater Ponto"></ButtonConfirm>
            </View>
        </View>
    );
}
