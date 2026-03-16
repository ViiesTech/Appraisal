import { StyleSheet, View } from "react-native";
import ShadowCard from "../ShadowCard";
import images from "../../services/utilities/images";
import { colors, fontFamily, fontSize, sizes } from "../../services/utilities";
import AppText from "../AppText";
import Icon from "react-native-vector-icons/Feather";

const StatsCards = () => {
    const stats = [
        {
            title: 'Total Assigned',
            value: '24',
            icon: 'file-text',
            id: 1
        },
        {
            title: 'Today\'s Tasks',
            value: '8',
            icon: 'clock',
            id: 2
        },
        {
            title: 'Completed',
            value: '16',
            icon: 'award',
            id: 3
        },
        {
            title: 'Success Rate',
            value: '98%',
            icon: 'trending-up',
            id: 4
        }
    ];

    return (
        <View style={styles.grid}>
            {stats.map((item) => (
                <ShadowCard
                    key={item.id}
                    imageSource={images.progressCardBG}
                    style={styles.card}
                    imageStyle={styles.cardBG}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.headerRow}>
                            <View style={styles.iconContainer}>
                                <Icon name={item.icon} size={fontSize.h5} color={colors.white} />
                            </View>
                            <AppText
                                fontSize={fontSize.h4}
                                fontFamily={fontFamily.Black}
                                color={colors.textDark}
                                style={styles.valueText}
                            >
                                {item.value}
                            </AppText>
                        </View>
                        <AppText
                            fontSize={fontSize.smallM}
                            fontFamily={fontFamily.Medium}
                            color={colors.textLighter}
                            style={styles.titleText}
                        >
                            {item.title}
                        </AppText>
                    </View>
                </ShadowCard>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: sizes.screenWidth * 0.43,
        marginBottom: sizes.screenWidth * 0.04,
        borderRadius: sizes.screenWidth * 0.04
    },
    cardBG: {
        borderRadius: sizes.screenWidth * 0.04,
    },
    cardContent: {
        flex: 1,
        padding: sizes.screenWidth * 0.03,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: sizes.screenHeight * 0.02,
    },
    iconContainer: {
        width: fontSize.h1,
        height: fontSize.h1,
        borderRadius:sizes.screenWidth * 0.03,
        backgroundColor: colors.blueNormal,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueText: {
    },
    titleText: {
    }
});

export default StatsCards;
