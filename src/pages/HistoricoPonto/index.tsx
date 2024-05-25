import React, { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import PontoBox from "@components/PontoBox";

export default function HistoricoPonto() {
    const [refreshing, setRefreshing] = useState(false);
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
                        onRefresh={() => {console.log("Recarregando")}}
                    />
                }
            >
                <PontoBox data={"07/10/2024"} time={"08:12"} status={false}/>
                <PontoBox data={"06/10/2024"} time={"20:12"} status={false}/>
                <PontoBox data={"06/10/2024"} time={"16:12"} status={true}/>
            </ScrollView>
        </View>
    );
}
