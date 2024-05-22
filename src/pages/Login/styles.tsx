import { StyleSheet } from 'react-native'

import { Colors } from '@constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.fourthary,
    },
    logo: {
        width: 212,
        height: 212,
    },
    appName: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        marginTop: 20,
        gap: 5,
    },
    appTitle: {
        color: Colors.text.yellow,
        fontWeight: "bold",
    },
    appSubTitle: {
        color: Colors.text.white,
    },
    formLogin: {
        width: "75%",
        marginTop: 50,
        gap: 20,
    },
    input: {
        backgroundColor: Colors.input.black,
    },
    btnLogin: {
        width: "100%",
        height: "auto",
        marginTop: 40,
    }
});

export default styles