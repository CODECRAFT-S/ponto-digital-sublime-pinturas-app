import { StyleSheet } from 'react-native'

import { Colors } from '@constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.primary,
    },
    logo: {
        width: 212,
        height: 212,
    }
});

export default styles