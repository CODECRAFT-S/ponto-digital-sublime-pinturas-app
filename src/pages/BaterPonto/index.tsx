import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, Text } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import notFoundImage from "@image/notFound.png";
import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";
import { apiUrl } from "@scripts/apiUrl";

type ModalStatus = "Success" | "Fail" | "Alert";

export default function BaterPonto({ navigation, route }) {
    let [username, setUsername] = useState("");
    let [token, setToken] = useState("");
    useEffect(() => {
        const name = SecureStore.getItemAsync("USERNAME")
            .then((e) => {
                return e;
            })
            .catch((e) => {
                navigation.navigate("Login");
            });
        const token = SecureStore.getItemAsync("TOKEN_USER")
            .then((e) => {
                return e;
            })
            .catch((e) => {
                navigation.navigate("Login");
            });
        setUsername(name);
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                navigation.navigate("Login");
                return;
            }
        })();
    }, []);

    const [photo, setPhoto] = useState(
        route.params?.photoData ?? notFoundImage
    );
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
        SecureStore.deleteItemAsync("TOKEN_USER");
        SecureStore.deleteItemAsync("USERNAME");
        navigation.navigate("Login");
    }

    function handleCapturePhoto() {
        navigation.navigate("CapturePhoto");
    }
    
    async function handleWorkPoint() {
        // let location = await Location.getCurrentPositionAsync({});
        const [lat, setLat] = useState("-7.527434828863182") 
        const [log, setLog] = useState("-46.04329892365424") 
        
        try {
            const result = await axios.get(apiUrl("/workpoint"), {
                data: {
                    lat, 
                    log
                }

            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }

    }

    async function handleBaterPonto() {

        setPhoto(notFoundImage);
        let timeFull = dataTime.toTimeString();
        try {
            
            console.log("Batendo Ponto");
            await handleWorkPoint()
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
                        {username}
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
