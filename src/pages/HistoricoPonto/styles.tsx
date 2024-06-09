import { Colors } from "@constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme.primary,
        paddingHorizontal: 30,
    },
    titlePage: {
        width: "100%",
        height: "auto",
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 20,
    },
    titleText: {
        color: Colors.text.primary,
        fontWeight: "700",
    },
    scrollView: {
        width: "100%",
        height: "auto",
        gap: 12,
        paddingBottom: 15,
    },
    btnSincronizar: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.theme.fourthary,
    },
    textSincronizar: {
        color: Colors.text.white,
    },
});

export default styles;
