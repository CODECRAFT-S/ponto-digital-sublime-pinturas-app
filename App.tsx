import React from "react";
import Routes from "routes";
import { StyleSheet, View, StatusBar } from "react-native";
import { Colors } from "@constants/Colors";
import { NavigationContainer } from '@react-navigation/native';

import Login from '@pages/Login';
import CapturePhoto from '@pages/CapturePhoto';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.theme.primary}
        barStyle= "light-content"
      />
      {/*<Login></Login>*/}
      <Routes />
    </NavigationContainer>
  );
}
