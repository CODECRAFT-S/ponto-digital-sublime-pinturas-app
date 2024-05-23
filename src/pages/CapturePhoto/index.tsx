import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

import styles from "./styles";
import ButtonConfirm from "@components/ButtonConfirm";
import { Colors } from "@constants/Colors";

export default function CapturePhoto() {
    const [permission, requestPermission] = useCameraPermissions();
    const camRef = useRef<CameraView>(null);

    async function takePicture() {
        if (camRef.current) {
            const options = {
                quality: 0.5,
                base64: true,
            };
            const data = await camRef.current.takePictureAsync(options);
            console.log(data);
        }
    }

    if (true) {
        return (
            <View style={styles.containerRequest}>
                <Feather name="alert-triangle" size={100} color={Colors.text.yellow} />
                <Text variant="titleLarge" style={styles.text}>
                    Precisamos da sua permissão para acessar a câmera.
                </Text>
                <ButtonConfirm onPress={requestPermission} text="Conceder permissão"></ButtonConfirm>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={"front"} ref={camRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonCamera}
                        onPress={takePicture}
                    >
                        <FontAwesome
                            name="camera"
                            size={50}
                            color={"white"}
                        ></FontAwesome>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}
