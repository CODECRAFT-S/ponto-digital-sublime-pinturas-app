import { StyleSheet ,View, StatusBar } from 'react-native';

import { Colors } from '@constants/Colors';

import Login from '@pages/Login';
import HistoricoPonto from '@pages/HistoricoPonto';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.theme.primary}
        barStyle= "light-content"
      />
      <HistoricoPonto></HistoricoPonto>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
