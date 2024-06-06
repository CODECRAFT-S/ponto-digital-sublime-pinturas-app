import { Colors } from '@constants/Colors';
import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    modalMensagem: {
        width: "75%",
        height: Platform.OS === "ios" ? 175 : "auto",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 6,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Colors.theme.tertiary, 
        gap: 15,
    },
    textModal: {
        color: Colors.text.white,
        textAlign: "center",
    },
});

export default styles