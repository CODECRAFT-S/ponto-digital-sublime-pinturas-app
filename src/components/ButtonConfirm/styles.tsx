import { Colors } from '@constants/Colors';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    btn: {
        width: "100%",
        height: "auto",
        backgroundColor: Colors.input.yellow,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16, 
        borderRadius: 6,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "500",
        height: 24,
        textAlign: "center",
        color: Colors.text.black
    },
});

export default styles