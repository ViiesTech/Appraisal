import { StyleSheet, View, ViewStyle, StyleProp, ImageBackground, ImageSourcePropType, ImageStyle, TouchableOpacity } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities';

interface ShadowCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    imageSource?: ImageSourcePropType;
    imageStyle?: StyleProp<ImageStyle>;
    onPress?: () => void;
}

const ShadowCard = ({ children, style, imageSource, imageStyle, onPress }: ShadowCardProps) => {
    const Content = () => (
        imageSource ? (
            <ImageBackground 
                source={imageSource} 
                style={styles.innerContainer}
                imageStyle={[styles.imageStyle, imageStyle]}
            >
                {children}
            </ImageBackground>
        ) : (
            <View style={styles.innerContainer}>
                {children}
            </View>
        )
    );

    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.8 : 1}
            onPress={onPress}
            disabled={!onPress}
            style={[styles.container, style]}
        >
            <Content />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: sizes.screenWidth * 0.04,
        // padding: sizes.screenWidth * 0.04,

        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android Shadow
        elevation: 2,
    },
    innerContainer: {
        // borderRadius: sizes.screenWidth * 0.04,
        overflow: 'hidden',
    },
    imageStyle: {

    }
});

export default ShadowCard;
