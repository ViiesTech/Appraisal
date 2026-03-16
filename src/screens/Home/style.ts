import { StyleSheet } from 'react-native';
import { colors } from '../../services/utilities/colors';
import { sizes } from '../../services/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: sizes.screenWidth * 0.05,
    paddingVertical: sizes.screenHeight * 0.02,
    backgroundColor: colors.AppBG,
  },
});

export default styles;
