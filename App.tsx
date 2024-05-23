import { StyleSheet, View, StatusBar } from "react-native";

import { Colors } from "@constants/Colors";

import Login from '@pages/Login';
import BaterPonto from '@pages/BaterPonto';
import CapturePhoto from '@pages/CapturePhoto';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.theme.primary}
        barStyle= "light-content"
      />
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
