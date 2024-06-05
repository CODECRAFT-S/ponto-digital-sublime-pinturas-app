import React, { useState, useEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import PontoBox from "@components/PontoBox";

import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { apiUrl } from "@scripts/apiUrl";

import ModalNotification from "@components/ModalNotification";
import { checkInternetConnection } from "@scripts/checkInternetConnection";

type ModalStatus = "Success" | "Fail" | "Alert";

interface PointProps {
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

interface PointOfflineProps {
    latitude: string;
    longitude: string;
    datetime: string;
    file: string;
}

export default function HistoricoPonto({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [pointsOnline, setPointsOnline] = useState<PointProps[]>();
    const [pointsOffline, setPointsOffline] = useState<PointOfflineProps[]>();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");

    let [token, setToken] = useState("");

    async function requestListPoints() {
        try {
            if (await checkInternetConnection()) {
                const result = await axios.get(apiUrl("/point/list"), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPointsOnline(result.data.data);
            }
        } catch (error) {
            setModalMessage("Algo deu Errado, Tente Novamente mais tarde!");
            setModalStatus("Fail");
            setModalVisible(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await SecureStore.getItemAsync("TOKEN_USER");
                const pointsOffline = await SecureStore.getItemAsync(
                    "POINT_OFFLINE"
                );
                if (!token && !pointsOffline) {
                    navigation.navigate("Login");
                } else {
                    await setToken(token);
                    await setPointsOffline(JSON.parse(pointsOffline));
                }
            } catch (e) {
                navigation.navigate("Login");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (token) {
            requestListPoints();
        }
    }, [token]);

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
                {pointsOffline?.map((point, index) => {
                    const formatedTime = point.datetime.split(" ");
                    const data = formatedTime[0].split("-");
                    return (
                        <PontoBox
                            key={index}
                            data={`${data[2]}/${data[1]}/${data[0]}`}
                            time={formatedTime[1]}
                            status={false}
                        />
                    );
                })}

                {pointsOnline?.map((point, index) => {
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
