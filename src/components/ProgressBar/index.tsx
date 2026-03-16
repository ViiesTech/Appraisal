import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, sizes } from '../../services/utilities';

interface ProgressBarProps {
    progress: number; // 0 to 100
    fillColor?: string;
    backgroundColor?: string;
    height?: number;
}

const ProgressBar = ({
    progress,
    fillColor = colors.statusBlue,
    backgroundColor = colors.borderLight,
    height = 7,
}: ProgressBarProps) => {
    const clampedProgress = Math.min(100, Math.max(0, progress));

    return (
        <View style={[styles.background, { backgroundColor, height, borderRadius: height / 2 }]}>
            <View
                style={[
                    styles.fill,
                    {
                        width: `${clampedProgress}%`,
                        backgroundColor: fillColor,
                        borderRadius: height / 2,
                        height:height
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        overflow: 'hidden',
        marginVertical:sizes.screenWidth * 0.02
    },
    fill: {
    },
});

export default ProgressBar;
