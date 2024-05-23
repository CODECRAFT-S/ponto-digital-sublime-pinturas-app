import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";

import styles from "./styles";
import { Colors } from "@constants/Colors";

export default function PontoBox() {
  return (
    <View style={styles.container}>
      <View style={styles.pontoDetails}>
        <Text style={styles.pontoTimeText} variant="labelLarge">
          Data: 16/04/2024
        </Text>
        <Text style={styles.pontoTimeText} variant="labelLarge">
          Hora: 14:00
        </Text>
      </View>
      <View style={styles.pontoStatus}>
        <Octicons name="verified" size={24} color={Colors.text.green} />
      </View>
    </View>
  );
}
