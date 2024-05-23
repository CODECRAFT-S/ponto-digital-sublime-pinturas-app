import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";

export default function HistoricoPonto() {
  return (
    <View style={styles.container} >
        <View style={styles.titlePage}>
        <Text style={styles.titleText}
        variant="titleMedium">Histórico de Resitros</Text>
        </View>
      <ScrollView scrollEnabled contentContainerStyle={styles.scrollView}>

      </ScrollView>
    </View>
  );
}
