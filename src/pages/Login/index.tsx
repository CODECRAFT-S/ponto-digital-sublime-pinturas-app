import React, { useState } from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import styles from "./styles";
import logoSP from "@image/logo.svg";
import { Colors } from "@constants/Colors";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
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
                    placeholder="Nome"
                    value={login}
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
                    secureTextEntry={passwordVisible}
                    value={password}
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
                                            passwordVisible
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
                
            </View>
        </View>
    );
}
