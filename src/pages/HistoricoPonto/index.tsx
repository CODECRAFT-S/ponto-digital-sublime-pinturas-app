import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import PontoBox from "@components/PontoBox";

import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { apiUrl } from "@scripts/apiUrl";

import ModalNotification from "@components/ModalNotification";

type ModalStatus = "Success" | "Fail" | "Alert";

interface Point {
    id: Number;
    system_user_id: Number;
    work_point_id: Number;
    latitude: String;
    longitude: String;
    datetime: String;
    file: String;
    created_at: String;
    deleted_at: String | null;
}

export default function HistoricoPonto({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [onlinePoint, setOnlinePoint] = useState<Point[]>();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");

    let [token, setToken] = useState("");
    useEffect(() => {
        const token = SecureStore.getItemAsync("TOKEN_USER")
            .then((e) => {
                return e;
            })
            .catch((e) => {
                navigation.navigate("Login");
            });
        setToken(token);
    }, []);

    async function requestListPoints() {
        try {
            const result = await axios.get(apiUrl("/point/list"), {
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiNzM1MjgyODIwNjEiLCJ1c2VyaWQiOjMsInVzZXJuYW1lIjoiSm9zXHUwMGU5IGRhIFNpbHZhIiwidXNlcm1haWwiOiJqb3NlQGdtYWlsLmNvbSIsImV4cGlyZXMiOjE3MTc3Njk4MTJ9.Aue35xz2Jrxb5SUCAn1s08teCUKf0FBtfShh6Su_4RY",
                },
            });
            // console.log(result.data.data);
            setOnlinePoint(result.data.data);
        } catch (error) {
            setModalMessage(
                "Algo deu Errado, Tente Novamente mais tarde!"
            );
            setModalStatus("Fail");
            setModalVisible(true);
        }
    }

    useEffect(() => {
        requestListPoints();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titlePage}>
                <Text style={styles.titleText} variant="titleMedium">
                    Histórico de Registros
                </Text>
            </View>
            <ScrollView
                scrollEnabled
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={requestListPoints}
                    />
                }
            >
                {/* <PontoBox data={"07/10/2024"} time={"08:12"} status={false} />
        <PontoBox data={"06/10/2024"} time={"20:12"} status={false} />
        <PontoBox data={"06/10/2024"} time={"16:12"} status={true} /> */}

                {onlinePoint?.map((point, index) => {
                    const formatedTime = point.datetime.split(" ");
                    const data = formatedTime[0].split("-");
                    return (
                        <PontoBox
                            key={index}
                            data={`${data[2]}/${data[1]}/${data[0]}`}
                            time={formatedTime[1]}
                            status={true}
                        />
                    );
                })}
            </ScrollView>
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
