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
    },
    titleText: {
        color: Colors.text.primary,
        fontWeight: "700",
    },
    scrollView: {
        width: "100%",
        height: "auto",
        gap: 12,
        paddingVertical: 20,
    },
});

export default styles;
