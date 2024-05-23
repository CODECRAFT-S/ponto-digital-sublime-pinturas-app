import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

export default function CapturePhoto() {
    const [permission, requestPermission] = useCameraPermissions();
    const camRef = useRef<CameraView>(null);

    async function takePicture() {
        if (camRef.current) {
            const options = {
                quality: 0.5, 
                base64: true,
            }
            const data = await camRef.current.takePictureAsync(options);
            console.log(data);
        }
    }

    if (!permission || !permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={"front"} ref={camRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
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
