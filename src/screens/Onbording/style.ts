import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { sizes } from "../../utils/sizes";
import { fontSize, fontFamily } from "../../utils/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        paddingHorizontal: sizes.screenWidth * 0.05,
        paddingVertical: sizes.screenHeight * 0.03
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: sizes.screenWidth * 0.5,
        height: sizes.screenWidth * 0.4,
    },
    title: {
        marginBottom: sizes.screenHeight * 0.02
    },
    bottomContainer: {
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: sizes.screenWidth * 0.03,
    },
    googleButton: {
        marginTop: sizes.smallMargin,
    }
})

export default styles
