import { Colors } from '@constants/Colors';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.primary,
    },
    headerPage: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        // backgroundColor: "#fff",
    },
    welcomeUser: {
        flex: 1,
        paddingLeft: 25,
        justifyContent: "center",
        flexDirection: "row",
    },
    textUser: {
        color: Colors.text.primary
    },
    timeCurrent: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        color: Colors.text.primary,
        fontSize: 75,
        fontWeight: "700",
    },
    btnPonto: {
        width: "80%",
        height: "auto",
        marginTop: 60,
    },
}); 

export default styles