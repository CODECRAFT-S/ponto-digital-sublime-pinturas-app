import { Colors } from "@constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 34,
    },
    buttonCamera: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    containerRequest: {
        flex: 1,
        backgroundColor: Colors.theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 10,
    },
    text: {
        textAlign: 'center',
        color: Colors.text.primary,
        marginBottom: 50,
    },
});

export default styles;
