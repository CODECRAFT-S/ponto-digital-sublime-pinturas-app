import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
    View,
    TouchableOpacity,
    Text,
    BackHandler,
    Alert,
    SafeAreaView,
} from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";

import notFoundImage from "@image/notFound.png";
import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";
import { checkInternetConnection } from "@scripts/checkInternetConnection";
import {
    deleteImageLocally,
    deleteOfflineImagesFolder,
    saveImageLocally,
} from "@scripts/handlerImage";
import { handleRegisterPoint, handleWorkPoint } from "@scripts/savePoint";
import CustomError from "@constants/Error";

type ModalStatus = "Success" | "Fail" | "Alert" | "Loading";

export default function BaterPonto({ navigation, route }) {
    let [username, setUsername] = useState("");
    let [token, setToken] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = await SecureStore.getItemAsync("USERNAME");
                const tokenStore = await SecureStore.getItemAsync("TOKEN_USER");
                if (!name || !tokenStore) {
                    navigation.navigate("Login");
                } else {
                    setUsername(name);
                    setToken(tokenStore);
                }
            } catch (e) {
                navigation.navigate("Login");
            }
        };
        fetchData();

        const backAction = () => {
            if (navigation.canGoBack()) {
                Alert.alert(
                    "Sair do APP",
                    "Você realmente quer fechar o app?",
                    [
                        {
                            text: "Cancelar",
                            onPress: () => {},
                            style: "cancel",
                        },
                        { text: "Sim", onPress: () => BackHandler.exitApp() },
                    ]
                );
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
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
    const [modalTime, setModalTime] = useState<number | null>(3000);
    const [submit, setSubmit] = useState(false);

    const padZero = (num: number) => (num < 10 ? `0${num}` : num);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function formatedTime() {
        const hours = padZero(dataTime.getHours());
        const minutes = padZero(dataTime.getMinutes());
        return `${hours}:${minutes}`;
    }

    function formatedDate() {
        const day = padZero(dataTime.getDate());
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

    async function logout() {
        const confirmLogout = () => {
            deleteOfflineImagesFolder()
                .then(() => SecureStore.deleteItemAsync("TOKEN_USER"))
                .then(() => SecureStore.deleteItemAsync("USERNAME"))
                .then(() => SecureStore.deleteItemAsync("POINT_OFFLINE"))
                .then(() => navigation.navigate("Login"));
        };

        Alert.alert(
            "Confirmar Logout",
            "Você realmente deseja fazer logout?",
            [
                {
                    text: "Não",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Sim",
                    onPress: confirmLogout,
                },
            ],
            { cancelable: false }
        );
    }

    function handleCapturePhoto() {
        navigation.navigate("CapturePhoto");
    }

    async function handleRegisterPointOffline(pointOffline: PointOfflineProps) {
        setModalVisible(true);
        try {
            const storedPoints = await SecureStore.getItemAsync(
                "POINT_OFFLINE"
            );
            const pointsOffline: PointOfflineProps[] = storedPoints
                ? JSON.parse(storedPoints)
                : [];
            pointsOffline.unshift(pointOffline);
            await SecureStore.setItemAsync(
                "POINT_OFFLINE",
                JSON.stringify(pointsOffline)
            );
        } catch (error) {
            throw new CustomError(
                "Erro inesperado ao registrar o ponto.",
                "Error_Register_Point"
            );
        }
    }

    async function handleBaterPonto() {
        setModalVisible(true);
        setModalTime(null);
        setModalStatus("Loading");
        setModalMessage("Sincronizando o GPS. Só um momento.");
        setSubmit(true);

        const getLocationWithTimeout = async (timeout: number) => {
            return new Promise<{
                coords: { latitude: number; longitude: number } | null;
            }>((resolve, reject) => {
                const timer = setTimeout(() => resolve(null), timeout);

                Location.getCurrentPositionAsync({})
                    .then((location) => {
                        clearTimeout(timer);
                        resolve(location);
                    })
                    .catch((error) => {
                        clearTimeout(timer);
                        resolve(null);
                    });
            });
        };

        try {
            const timeFull = `${padZero(dataTime.getFullYear())}-${padZero(
                dataTime.getMonth() + 1
            )}-${padZero(dataTime.getDate())} ${padZero(
                dataTime.getHours()
            )}:${padZero(dataTime.getMinutes())}:${padZero(
                dataTime.getSeconds()
            )}`;

            const location = await getLocationWithTimeout(10000);
            const latitude = location ? String(location.coords.latitude) : null;
            const longitude = location
                ? String(location.coords.longitude)
                : null;
            // const latitude = "-7.527434828863182";
            // const longitude = "-46.04329892365424";

            if (await checkInternetConnection()) {
                setModalMessage("Registrando o ponto. Só um momento.");
                const workPoint: WorkPointProps = await handleWorkPoint(
                    latitude,
                    longitude
                );

                await handleRegisterPoint(
                    {
                        workPointId: String(workPoint.data.id),
                        latitude,
                        longitude,
                        datetime: timeFull,
                        file: photo,
                    },
                    token
                );
                await deleteImageLocally(photo);
                setModalMessage("Ponto registrado com sucesso.");
                setModalStatus("Success");
            } else {
                await handleRegisterPointOffline({
                    datetime: timeFull,
                    latitude: latitude ?? "null",
                    longitude: longitude ?? "null",
                    file: await saveImageLocally(
                        photo,
                        `${timeFull}-${latitude}_${longitude}`
                    ),
                });
                setModalMessage(
                    "Ponto registrado Localmente. \nSicronize os dados!"
                );
                setModalStatus("Success");
            }
        } catch (error) {
            setModalStatus("Fail");
            if (error instanceof CustomError) {
                setModalMessage(error.message);
            } else {
                setModalMessage(
                    "Algo inesperado aconteceu. \nContate o Suporte ou Tente Novamente!."
                );
            }
        }
        setSubmit(false);
        setModalTime(3000);
        setPhoto(notFoundImage);
    }

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

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
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.textUser, { fontWeight: "bold" }]}
                    >
                        {truncateText(username, 20)}
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
                    style={[
                        styles.cameraButton,
                        { opacity: submit ? 0.31 : 1 },
                    ]}
                    onPress={handleCapturePhoto}
                    disabled={submit}
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
                    disable={photo == notFoundImage || submit ? true : false}
                    onPress={handleBaterPonto}
                ></ButtonConfirm>
            </View>
            <ModalNotification
                mensagem={modalMessage}
                status={modalStatus}
                timeVisable={modalTime}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
            />
        </View>
    );
}
