import { Colors } from "@constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: "auto",
        backgroundColor: Colors.theme.fourthary,
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 6,
    },
    pontoDetails: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },
    pontoTimeText: {
        color: Colors.text.gray,
        fontWeight: "400",
    },
    pontoStatus: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;
