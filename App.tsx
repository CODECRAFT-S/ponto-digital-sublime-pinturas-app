import React from "react";
import Routes from "routes";
import { StatusBar } from "react-native";
import { Colors } from "@constants/Colors";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.theme.primary}
        barStyle= "light-content"
      />
      <Routes />
    </NavigationContainer>
  );
}
