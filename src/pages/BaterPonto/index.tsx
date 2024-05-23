import React, { useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, Text } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import notFoundImage from "@image/notFound.png";
import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";

export default function BaterPonto() {
    const [photo, setPhoto] = useState(notFoundImage)
    return (
        <View style={styles.container}>
            <View style={styles.headerPage}>
                <View style={styles.welcomeUser}>
                    <TextPaper
                        variant="titleMedium"
                        style={[styles.textUser, { fontWeight: "400" }]}
                    >
                        Olá, 
                    </TextPaper>
                    <TextPaper
                        variant="titleMedium"
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
            <View style={styles.imageContainer}>
                <Image 
                    source={photo} 
                    style={styles.image}
                />
                <TouchableOpacity style={styles.cameraButton}>
                    <FontAwesome name="camera" size={27} color={Colors.text.tertiary} />
                </TouchableOpacity>
            </View>
            <View style={styles.timeCurrent}>
                <Text style={styles.time}>16:12</Text>
                <TextPaper variant="labelLarge" style={{color: Colors.text.secondary}}>18 de Abril, 2024</TextPaper>
            </View>
            <View style={styles.btnPonto}>
                <ButtonConfirm text="Bater Ponto"></ButtonConfirm>
            </View>
        </View>
    );
}
