import { Colors } from '@constants/Colors';
import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme.primary,
    },
    headerPage: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: Platform.OS === "ios" ? 75 : 35,
        paddingHorizontal: 20,
        marginBottom: 30,
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
    imageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginVertical: 20,
        marginBottom: 40,
    },
    image: {
        width: 225,
        height: 225,
        // resizeMode: "contain",
    },
    cameraButton: {
        position: "absolute",
        bottom: -20,
        right:60,
        backgroundColor: Colors.theme.secondary,
        borderRadius: 100,
        width: 63,
        height: 63,
        alignItems: "center",
        justifyContent: "center",
    },
    timeCurrent: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    time: {
        color: Colors.text.primary,
        fontSize: 95,
        fontWeight: "700",
    },
    btnPonto: {
        width: "80%",
        height: "auto",
        marginTop: 40,
    },
}); 

export default styles