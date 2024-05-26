import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, Keyboard, Pressable } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios, { AxiosError } from "axios";
import * as SecureStore from 'expo-secure-store';

import styles from "./styles";
import logoSP from "@image/logo.svg";
import { apiUrl } from "@scripts/apiUrl";
import { KeyApi } from "@constants/KeyApi";
import { Colors } from "@constants/Colors";

import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";

type ModalStatus = "Success" | "Fail" | "Alert";

interface UserDetails {
    status: boolean,
    data: {
        user: string,
        userid: number,
        username: string,
        usermail: string,
        token: string
    }
}

export default function Login({ navigation }) {

    useEffect(()=>{
        SecureStore.getItemAsync("TOKEN_USER").then((e)=>{
            if(e !== null){
                navigation.navigate("Home")
            }
        })

    }, [])

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
            const result = await axios.get(
                apiUrl(`/auth/${login}/${password}`),
                {
                    headers: {
                        Authorization: KeyApi,
                    },
                }
            );
            if (result.status === 200) {
                const data: UserDetails = result.data
                await SecureStore.setItemAsync("TOKEN_USER", data.data.token)
                await SecureStore.setItemAsync("USERNAME", data.data.username)
                navigation.navigate("Home");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const data = error.response.data;
                    // console.log(data);
                    if (
                        data.data ===
                        "Usuário não encontrado ou senha incorreta"
                    ) {
                        setModalMessage(
                            "Usuário não encontrado ou senha incorreta!"
                        );
                        setModalStatus("Fail");
                        setModalVisible(true);
                    }
                    else {
                        setModalMessage(
                            "Algo deu Errado, Tente Novamente mais tarde!"
                        );
                        setModalStatus("Alert");
                        setModalVisible(true);
                    }
                }
            }
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
                    style={styles.input}
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
                    style={styles.input}
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
