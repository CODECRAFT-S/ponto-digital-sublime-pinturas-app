import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, Keyboard, Pressable, BackHandler } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import styles from "./styles";
import logoSP from "@image/logo.svg";
import { apiUrl } from "@scripts/apiUrl";
import { KeyApi } from "@constants/KeyApi";
import { Colors } from "@constants/Colors";

import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";
import { checkInternetConnection } from "@scripts/checkInternetConnection";
import CustomError from "@constants/Error";

type ModalStatus = "Success" | "Fail" | "Alert";

export default function Login({ navigation }) {
    useEffect(() => {
        SecureStore.getItemAsync("TOKEN_USER").then((e) => {
            if (e !== null) {
                navigation.navigate("Home");
            }
        });

        const backAction = () => {
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");

    async function handleLogin() {
        setSubmit(true);
        setPassword("");
        if (login && password) {
            await requestAuth();
        }
        setSubmit(false);
    }

    async function requestAuth() {
        try {
            if (await checkInternetConnection()) {
                const result = await axios.get(
                    apiUrl(`/auth/${login}/${password}`),
                    {
                        headers: {
                            Authorization: KeyApi,
                        },
                    }
                );
                if (result.status === 200) {
                    const data: UserDetails = result.data;
                    await SecureStore.setItemAsync(
                        "TOKEN_USER",
                        data.data.token
                    );
                    await SecureStore.setItemAsync(
                        "USERNAME",
                        data.data.username
                    );
                    await SecureStore.setItemAsync(
                        "POINT_OFFLINE",
                        JSON.stringify([])
                    );
                    navigation.navigate("Home");
                }
            } else {
                throw new CustomError(
                    "Sem acesso a Internet! \nAche uma rede para realizar Login.",
                    "Not Network"
                );
            }
        } catch (error) {
            setModalStatus("Fail");
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const data = error.response.data;
                    if (
                        data.data ===
                        "Usuário não encontrado ou senha incorreta"
                    ) {
                        setModalMessage(
                            "Usuário não encontrado ou senha incorreta!"
                        );
                    } else {
                        setModalStatus("Alert");
                        setModalMessage(
                            "Algo deu Errado, Tente Novamente mais tarde!"
                        );
                    }
                }
            } else if (error instanceof CustomError) {
                setModalMessage(error.message);
            } else {
                setModalMessage(
                    "Algo inesperado aconteceu. \nContate o Suporte ou Tente Novamente!."
                );
            }
            setModalVisible(true);
        }
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <Image style={styles.logo} source={logoSP} />
            <View style={styles.appName}>
                <Text variant="headlineLarge" style={styles.appTitle}>
                    PontoDigital
                </Text>
                <Text variant="titleMedium" style={styles.appSubTitle}>
                    Registro de entrada e saída.
                </Text>
            </View>
            <View style={styles.formLogin}>
                <TextInput
                    style={[styles.input, { textAlign: "auto" }]}
                    outlineStyle={{ borderWidth: 0 }}
                    textColor={Colors.text.white}
                    cursorColor={Colors.text.primary}
                    mode="outlined"
                    placeholder="Identificador"
                    value={login}
                    disabled={submit}
                    onChangeText={(value) => setLogin(value)}
                    left={
                        <TextInput.Affix
                            text={
                                <AntDesign
                                    name="user"
                                    size={25}
                                    color={Colors.input.gray}
                                />
                            }
                        />
                    }
                />
                <TextInput
                    style={[styles.input, { textAlign: "auto" }]}
                    outlineStyle={{ borderWidth: 0 }}
                    textColor={Colors.text.white}
                    cursorColor={Colors.text.primary}
                    mode="outlined"
                    placeholder="Senha"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    disabled={submit}
                    onChangeText={(value) => setPassword(value)}
                    left={
                        <TextInput.Affix
                            text={
                                <AntDesign
                                    name="lock1"
                                    size={25}
                                    color={Colors.input.gray}
                                />
                            }
                        />
                    }
                    right={
                        <TextInput.Affix
                            text={
                                <Text
                                    onPress={() => {
                                        setPasswordVisible(
                                            (visible) => !visible
                                        );
                                    }}
                                >
                                    <Entypo
                                        name={
                                            !passwordVisible
                                                ? "eye"
                                                : "eye-with-line"
                                        }
                                        size={25}
                                        color={Colors.input.gray}
                                    />
                                </Text>
                            }
                        />
                    }
                />
                <View style={styles.btnLogin}>
                    <ButtonConfirm
                        text="Entrar"
                        onPress={handleLogin}
                        disable={
                            login == "" || password == "" || submit
                                ? true
                                : false
                        }
                    />
                </View>
            </View>
            <ModalNotification
                mensagem={modalMessage}
                status={modalStatus}
                timeVisable={3000}
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
            />
        </Pressable>
    );
}
