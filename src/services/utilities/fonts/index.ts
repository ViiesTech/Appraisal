import { Platform, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Function to calculate relative sizes
const totalSize = (size: number) =>
    Math.sqrt(height * height + width * width) * (size / 100);

const fontFamily: { [key: string]: string } = {
    Black:'Lato-Black',
    BlackItalic:'Lato-BlackItalic',
    Bold:'Lato-Bold',
    BoldItalic:'Lato-BoldItalic',
    Italic:'Lato-Italic',
    Light:'Lato-Light',
    LightItalic:'Lato-LightItalic',
    Regular:'Lato-Regular',
    Thin:'Lato-Thin',
    ThinItalic:'Lato-ThinItalic',
};

const fontSize: { [key: string]: number } = {
    h1: totalSize(4.5),
    h2: totalSize(4),
    h3: totalSize(3.5),
    h4: totalSize(3),
    h5: totalSize(2.5),
    h7: totalSize(2.2),
    h6: totalSize(2),
    input: totalSize(1.75),
    extraLarge: totalSize(2.2),
    large: totalSize(2),
    medium: totalSize(1.75),
    regular: totalSize(1.6),
    smallM: totalSize(1.5),
    small: totalSize(1.25),
    tiny: totalSize(1),
    extraSmall: totalSize(0.8),
    xxsmall: totalSize(0.5),
};

export { fontFamily, fontSize };
