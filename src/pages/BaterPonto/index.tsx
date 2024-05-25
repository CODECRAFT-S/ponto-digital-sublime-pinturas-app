import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, Text } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

import notFoundImage from "@image/notFound.png";
import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";

type ModalStatus = "Success" | "Fail" | "Alert";

export default function BaterPonto({ navigation, route }) {
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                navigation.navigate("Login");
                return;
            }
        })();
    }, []);

    const [photo, setPhoto] = useState(route.params?.photoData ?? notFoundImage);
    const [dataTime, setDataTime] = useState(new Date());

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");

    useEffect(() => {
        const interval = setInterval(() => {
            setDataTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatedTime() {
        const hours = String(dataTime.getHours()).padStart(2, "0");
        const minutes = String(dataTime.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    }

    function formatedDate() {
        const day = dataTime.getDate();
        const monthNames = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];
        const month = monthNames[dataTime.getMonth()];
        const year = dataTime.getFullYear();
        return `${day} de ${month}, ${year}`;
    }

    function logout() {
        console.log("Logout");
        navigation.navigate("Login");
    }

    function handleCapturePhoto() {
        navigation.navigate("CapturePhoto");
    }

    async function handleBaterPonto() {
        setPhoto(notFoundImage);
        let timeFull = dataTime.toTimeString();
        try {
            let location = await Location.getCurrentPositionAsync({});
            console.log("Batendo Ponto");
            console.log(location);
            console.log(timeFull);
            console.log(photo);

            setModalMessage("Ponto registrado com sucesso!");
            setModalStatus("Success");
        } catch (error) {
            console.log(error);
            setModalMessage("Falha ao registrar o ponto. Tente novamente.");
            setModalStatus("Fail");
        }
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerPage}>
                <View style={styles.welcomeUser}>
                    <TextPaper
                        variant="titleMedium"
                        style={[styles.textUser, { fontWeight: "400" }]}
                    >
                        Olá,{" "}
                    </TextPaper>
                    <TextPaper
                        variant="titleMedium"
                        style={[styles.textUser, { fontWeight: "bold" }]}
                    >
                        Nome Do Funcionário
                    </TextPaper>
                </View>
                <TouchableOpacity onPress={logout}>
                    <FontAwesome
                        name="power-off"
                        size={25}
                        color={Colors.text.yellow}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={photo} style={styles.image} />
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleCapturePhoto}
                >
                    <FontAwesome
                        name="camera"
                        size={27}
                        color={Colors.text.tertiary}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.timeCurrent}>
                <Text style={styles.time}>{formatedTime()}</Text>
                <TextPaper
                    variant="labelLarge"
                    style={{ color: Colors.text.secondary }}
                >
                    {formatedDate()}
                </TextPaper>
            </View>
            <View style={styles.btnPonto}>
                <ButtonConfirm
                    text="Bater Ponto"
                    disable={photo == notFoundImage ? true : false}
                    onPress={handleBaterPonto}
                ></ButtonConfirm>
            </View>
            <ModalNotification
                mensagem={modalMessage}
                status={modalStatus}
                timeVisable={3000}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
            />
        </View>
    );
}
