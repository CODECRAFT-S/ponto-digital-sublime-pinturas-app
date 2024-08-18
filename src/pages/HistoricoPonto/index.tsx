import React, { useState, useEffect, useRef } from "react";
import {
    View,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { apiUrl } from "@scripts/apiUrl";

import PontoBox from "@components/PontoBox";
import ModalNotification from "@components/ModalNotification";
import { checkInternetConnection } from "@scripts/checkInternetConnection";
import { handleRegisterPoint, handleWorkPoint } from "@scripts/savePoint";
import { deleteImageLocally } from "@scripts/handlerImage";
import CustomError from "@constants/Error";

type ModalStatus = "Success" | "Fail" | "Alert" | "Loading";

export default function HistoricoPonto({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [pointsOnline, setPointsOnline] = useState<PointProps[]>();
    const [pointsOffline, setPointsOffline] = useState<PointOfflineProps[]>();
    const [asyncPoints, setAsyncPoints] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");
    const [modalTime, setModalTime] = useState<number | null>(3000);

    const scrollViewRef = useRef<ScrollView>(null);

    let [token, setToken] = useState("");

    async function requestListPoints() {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        setRefreshing(true);
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
        setRefreshing(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenStore = await SecureStore.getItemAsync("TOKEN_USER");
                const points = await SecureStore.getItemAsync("POINT_OFFLINE");
                if (!tokenStore && !points) {
                    navigation.navigate("Login");
                } else {
                    await setToken(tokenStore);
                    await setPointsOffline(JSON.parse(points));
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
    }, [token, pointsOffline?.length === 0]);

    async function registerAsyncPoint(point: PointOfflineProps) {
        try {
            const workPoint: WorkPointProps = await handleWorkPoint(
                point.latitude,
                point.longitude
            );
            if (!Array.isArray(workPoint.data)) {
                await handleRegisterPoint(
                    {
                        workPointId: String(workPoint.data.id),
                        latitude: point.latitude,
                        longitude: point.longitude,
                        datetime: point.datetime,
                        file: point.file,
                    },
                    token
                );

                await deleteImageLocally(point.file);
            } else {
                return;
            }
        } catch (error) {
            throw new Error();
        }
    }

    async function handlerAsyncPoint() {
        setAsyncPoints(true);
        setModalVisible(true);
        try {
            if (await checkInternetConnection()) {
                setModalTime(null);
                setModalStatus("Loading");
                setModalMessage("Aguarde o processo. Só um momento.");
                const reversedPoints = [...(pointsOffline || [])].reverse();
                for (let point of reversedPoints) {
                    await registerAsyncPoint(point);
                    pointsOffline.pop(); 
                    await SecureStore.setItemAsync(
                        "POINT_OFFLINE",
                        JSON.stringify(pointsOffline)
                    );
                }
                setModalMessage("Dados Sincronizados!");
                setModalStatus("Success");
            } else {
                throw new CustomError(
                    "Dados não Sincronizados! \n Sem acesso a Internet",
                    "Not Network"
                );
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
        setModalTime(3000);
        setAsyncPoints(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titlePage}>
                <Text style={styles.titleText} variant="titleMedium">
                    Histórico de Registros
                </Text>

                <TouchableOpacity
                    style={[
                        styles.btnSincronizar,
                        { opacity: pointsOffline?.length > 0 ? 1 : 0.31 },
                    ]}
                    disabled={asyncPoints || pointsOffline?.length === 0}
                    onPress={handlerAsyncPoint}
                >
                    <Text style={styles.textSincronizar} variant="titleMedium">
                        Sincronizar
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                scrollEnabled
                ref={scrollViewRef}
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
                            key={String(point.id)}
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
